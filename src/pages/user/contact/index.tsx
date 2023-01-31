import React from "react";
import UserLayout from "..";
import Input from "@/components/Input/input";
import Button from "@/components/Button/Button";
import TextArea from "@/components/TextArea/TextArea";

function Contact() {
  return (
    <UserLayout>
      <div className="flex flex-col gap-3 items-center my-5 rounded-xl bg-[#16161a]">
        <h1 className="text-2xl text-center">Contact Us!</h1>
        <span className="text-base text-center lg:text-lg">
          You can send an email to us whenever you want.
        </span>
        <div className="flex flex-col justify-center items-center gap-3">
          <Input name="name" placeholder="Name" />
          <Input name="subject" placeholder="Subject" />
          <TextArea name="message" placeholder="Message" h="12rem" />
          <Button name="Send" color="#107eeb" />
        </div>
      </div>
    </UserLayout>
  );
}

export default Contact;
