import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../../server";
import axios from "axios";
const ActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);
  useEffect(() => {
    if (activation_token) {
      const activationMail = async () => {
        try {
          const res = await axios.post(`${server}/user/activation`, {
            activation_token,
          });
          console.log(res.data.message);
        } catch (error) {
          console.log(error.response.data.message);
          setError(true);
        }
      };
      activationMail();
    }
  }, [activation_token]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error ? (
        <p>Mã xác thực đã hết hiệu lực !</p>
      ) : (
        <p>Tài khoản của bạn đã kích hoạt thành công !</p>
      )}
    </div>
  );
};

export default ActivationPage;
