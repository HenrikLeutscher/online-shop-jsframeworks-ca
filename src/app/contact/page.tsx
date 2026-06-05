"use client";

import { useState } from "react";
import type { ContactData } from "../types/contactData";

export default function ContactPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const contactDetails: ContactData = {
      fullName: formData.get("fullName") as string,
      subject: formData.get("subject") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    if (!contactDetails.fullName || contactDetails.fullName.trim().length < 3) {
      setError("Please enter a valid full name.");
      return;
    }

    if (!contactDetails.subject || contactDetails.subject.trim().length < 3) {
      setError("Please enter a valid subject.");
      return;
    }

    if (!contactDetails.email || !/^\S+@\S+\.\S+$/.test(contactDetails.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!contactDetails.message || contactDetails.message.trim().length < 10) {
      setError("Please enter a message with at least 10 characters.");
      return;
    }

    console.log("Contact Details:", contactDetails);
    setSuccess(`Thank you for your message, ${contactDetails.fullName}!`);

    setTimeout(() => {
      setSuccess("");
    }, 5000);

    event.currentTarget.reset();
    setError("");
  };

  return (
    <main className="bg-background p-6 text-black min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 md:max-w-1/2 mx-auto"
      >
        <h1 className="font-bold text-center">Contact Us</h1>
        <div className="flex flex-col">
          <label htmlFor="fullName" className="inputLabels">
            Full Name:
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            className="inputFields"
            placeholder="Enter your full name"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="subject" className="inputLabels">
            Subject:
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            className="inputFields"
            placeholder="What is your inquiry about?"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="inputLabels">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="inputFields"
            placeholder="Enter your email address"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="message" className="inputLabels">
            Message:
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            className="inputFields"
            placeholder="Enter your message here"
          />
        </div>
        <button type="submit" className="bg-brand text-white px-4 py-2 rounded">
          Send Message
        </button>
      </form>
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      {success && (
        <p className="text-green-700 mt-4 text-center font-bold">{success}</p>
      )}
    </main>
  );
}
