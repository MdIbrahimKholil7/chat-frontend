import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import userImg from "../assets/user.png";
import { useUpdateUserDataMutation } from "../features/auth/authApi";
import { addImg, userLoggedIn } from "../features/auth/authSlice";
interface Props {
  userDetails: any;
}
interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

const ProfileModal = () => {
  const {
    menu: { openModal },
  } = useSelector((state: any) => state);
  //   console.log(openModal);
  const { name } = openModal || {};
  const [nameInput, setNameInput] = useState<string>(name);
  const [img, setImg] = useState<string | any>(
    "http://res.cloudinary.com/deliy4nnm/image/upload/v1675268912/chat_images/d1ctsip7grmqcsakdmf2.jpg"
  );
  const [updateUserData, { data, isLoading, error }] =
    useUpdateUserDataMutation();
  const [cookies, removeCookie]: any = useCookies(["chatUser"]);
  const image = cookies?.chatUser?.data?.result;
  const dispatch = useDispatch();

  const onImageChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    if ("files" in e.target) {
      const formData = new FormData();
      const file: any = e.target.files?.[0];
      formData.append("file", file);

      formData.append("cloud_name", "deliy4nnm");
      formData.append("upload_preset", "chatapp");
      const url = `https://api.cloudinary.com/v1_1/deliy4nnm/image/upload`;

      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data: any) => {
          setImg(data.url);
        });
    }
    // setImg(files)
  };

  const handleForm = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(userLoggedIn(cookies?.chatUser));
    updateUserData({
      name: nameInput,
      img,
    });
    dispatch(addImg(img))
  };
//   console.log(cookies?.chatUser?.data?.result)
  return (
    <div>
      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle z-[999]">
        <div className="z-[999] bg-slate-600 p-4 rounded-md">
          <h3 className="font-bold text-lg text-center">Update Your Profile</h3>
          <div className="card flex-shrink-0 w-[600px] shadow-2xl bg-base-100 mt-10">
            <form onSubmit={handleForm} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="email"
                  className="input input-bordered text-black"
                  value={nameInput}
                  onChange={(e: React.FormEvent<HTMLInputElement>): void => {
                    setNameInput(e.currentTarget.value);
                  }}
                />
              </div>
              <div className="form-control text-center">
                <div className="flex justify-center items-center my-10">
                  <Image
                    src={img}
                    alt="user Image"
                    width={200}
                    height={200}
                    className="rounded-full"
                  />
                </div>
                <label
                  htmlFor="image"
                  className="label text-center flex justify-center items-center"
                >
                  <span className="label-text btn btn-primary text-white text-center ">
                    Select Image
                  </span>
                </label>
                <input
                  onChange={onImageChange}
                  type="file"
                  placeholder="password"
                  className="input input-bordered text-black hidden"
                  id="image"
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Update</button>
              </div>
            </form>
          </div>
          <div className="modal-action">
            <label htmlFor="my-modal-6" className="btn">
              Yay!
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
