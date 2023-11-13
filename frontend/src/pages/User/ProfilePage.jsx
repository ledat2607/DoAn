import React, { useEffect, useState } from "react";
import Header from "../../components/Layout/Header";
import styles from "../../styles/styles";
import ProfileSideBar from "../../components/Profile/ProfileSideBar";
import ProfileContent from "../../components/Profile/ProfileContent";
import Loader from "../../components/Layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfUser } from "../../redux/actions/order";
const ProfilePage = () => {
  const { user, loading } = useSelector((state) => state.user);
  const [active, setActive] = useState(1);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOrdersOfUser(user?._id));
  }, [user?._id, dispatch]);
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className={`${styles.section} 800px:flex bg-[#f5f5f5] py-10`}>
            <div className={`w-full 800px:w-[335px] mt-2 800px:mt-0`}>
              <ProfileSideBar
                active={active}
                setActive={setActive}
                open={open}
              />
            </div>
            <div className="w-[95%] mx-auto mt-10 800px:mt-0">
              <ProfileContent active={active} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
