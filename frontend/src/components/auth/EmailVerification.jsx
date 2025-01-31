import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resendEmailVerificationToken, verifyUserEmail } from "../../api/auth";
import Container from "../Container";
import FormContainer from "../form/FormContainer";
import Submit from "../form/Submit";
import Title from "../form/Title";
import { useAuth, useNotification } from "../../hooks";

const OTP_LENGTH = 6;

const isValidOTP = (otp) => {
  let valid = false;

  for (let val of otp) {
    valid = !isNaN(parseInt(val));
    if (!valid) break;
  }

  return valid;
};

export default function EmailVerification() {
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);

  
  const { isAuth, authInfo } = useAuth();
  const { isLoggedIn, profile  } = authInfo;
  const isVerified = profile?.isVerified;

  const inputRef = useRef();
  const { updateNotification } = useNotification()
  const { state } = useLocation();
  const user = state?.user;

  const navigate = useNavigate();

    const handleOtpChange = ({ target }, index) => {
    const { value } = target;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1, value.length);
    setOtp([...newOtp]);
    setActiveOtpIndex(index + 1);
  };
  const handleOTPResend = async () => {
    const { error, message } = await resendEmailVerificationToken(user.id);

    if (error) return updateNotification("error", error);

    updateNotification("success", message);
  };

  const handleKeyPress = (event, index) => {
    if (/[^\d]/.test(event.key) && event.key !== 'Backspace') {
      event.preventDefault();
    }
    if (event.key === 'Backspace') {
      event.preventDefault();
      setActiveOtpIndex(index === 0? 0 : index - 1);
      const updatedOtp = [...otp];
      updatedOtp[index] = ''; 
      setOtp(updatedOtp);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidOTP(otp)) {
      return updateNotification("error","invalid OTP");
    }

    // submit otp
    const { error, message,user: userResponse } = await verifyUserEmail({
      OTP: otp.join(""),
      userId: user.id,
    });
    if (error) return updateNotification("error", error);

    updateNotification("success", message);
    localStorage.setItem("auth-token", userResponse.token);
    isAuth();
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);

  useEffect(() => {
    if (!user) navigate("/not-found");
    if (isLoggedIn  && isVerified) navigate("/");
    // eslint-disable-next-line
  }, [user, isLoggedIn, isVerified]);

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className="rounded shadow-gray-400 shadow-sm p-4 space-y-6 bg-eggshell">
          <div>
            <Title>Please enter the OTP to verify your account</Title>
            <p className="text-center  text-light-subtle">
              OTP has been sent to your email
            </p>
          </div>

          <div className="flex justify-center items-center space-x-4">
            {otp.map((_, index) => {
              return (
                <input
                  onKeyDown={(e) => handleKeyPress(e, index)}
                  ref={activeOtpIndex === index ? inputRef : null}
                  key={index}
                  type="number"
                  value={otp[index] || ""}
                  onChange={(e) => handleOtpChange(e, index)}
                  className="w-12 h-12 border-2  border-light-subtle  focus:border-primary rounded bg-transparent outline-none text-center  text-primary font-semibold text-xl spin-button-none"
                />
              );
            })}
          </div>
          <div>
            <Submit value="Verify Account" />
            <button
              onClick={handleOTPResend}
              type="button"
              className="text-blue-500 font-semibold hover:underline mt-2 mx-auto flex"
            >
              Send new OTP
            </button>
          </div>

        </form>
      </Container>
    </FormContainer>
  );
}
