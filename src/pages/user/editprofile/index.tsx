import React from "react";
import UserLayout from "..";
import Input from "@/components/Input/input";
import Button from "@/components/Button/Button";

function EditProfile() {
  return (
    <UserLayout>
      <div className="flex justify-center">
        <div className="flex flex-col gap-3 items-center w-80 py-5">
          <h1 className="text-2xl text-center">Edit Profile</h1>
          <Input
            label="Username"
            placeholder="e.g. quizmaster26"
            value="Fatih Sultan Mehmet"
          />
          <Input
            label="E-mail"
            placeholder="e.g. user@quizapp.com"
            value="fsm1453@gmail.com"
          />
          <Input
            label="Password"
            type="password"
            placeholder="***"
            value="orneksifre"
          />
          <Button name="Edit" color="#107eeb" />
        </div>
      </div>
    </UserLayout>
  );
}

export default EditProfile;
