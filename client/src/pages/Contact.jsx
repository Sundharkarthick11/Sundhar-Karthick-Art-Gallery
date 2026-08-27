import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const buildMessage = () => {
    return `Hello Sundhar Karthick Art Gallery,

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || "Not provided"}
Subject: ${formData.subject}

Message:
${formData.message}

Thank you.`;
  };

  const validateForm = () => {
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.subject.trim() ||
      !formData.message.trim()
    ) {
      alert("Please fill in all required fields.");
      return false;
    }

    return true;
  };

  const sendWhatsApp = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Replace this with your actual WhatsApp number.
    // Use country code without + or spaces.
    const whatsappNumber = "919384316129";

    const message = encodeURIComponent(buildMessage());

    window.open(
  `https://wa.me/${whatsappNumber}?text=${message}`,
  "_blank"
);
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Replace this with your actual gallery email.
    const emailAddress = "sundharkarthick03@gmail.com";

    const subject = encodeURIComponent(
      formData.subject
    );

    const body = encodeURIComponent(
      buildMessage()
    );

    window.location.href =
      `mailto:${emailAddress}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Hero */}

      <section className="px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">

          <p className="uppercase tracking-[0.3em] text-amber-400">
            Get In Touch
          </p>

          <h1 className="mt-5 text-5xl md:text-6xl font-bold">
            Contact{" "}
            <span className="text-amber-400">
              Us
            </span>
          </h1>

          <p className="mt-6 text-lg text-slate-400 leading-8">
            Have a question or want to create a custom
            artwork? Get in touch and let's turn your
            idea into something special.
          </p>

        </div>
      </section>


      {/* Contact Content */}

      <section className="px-6 pb-20">

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10">


          {/* Contact Information */}

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

            <h2 className="text-3xl font-bold">
              Let's Connect
            </h2>

            <p className="mt-4 text-slate-400 leading-7">
              Whether you are looking for a custom portrait,
              want to know more about our artwork, or simply
              have a question, feel free to reach out.
            </p>


            {/* Email */}

            <div className="mt-10 flex gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-2xl">
                ✉️
              </div>

              <div>
                <h3 className="font-semibold text-white">
                  Email
                </h3>

                <a
  href="mailto:sundharkarthick03@gmail.com"
  className="mt-1 inline-block text-slate-400 hover:text-amber-400"
>
  sundharkarthick03@gmail.com
</a>
              </div>

            </div>


            {/* WhatsApp */}

            <div className="mt-7 flex gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-2xl">
                💬
              </div>

              <div>
                <h3 className="font-semibold text-white">
                  WhatsApp
                </h3>

                <a
  href="https://wa.me/919384316129"
  target="_blank"
  rel="noopener noreferrer"
  className="mt-1 inline-block text-slate-400 hover:text-amber-400"
>
  9384316129
</a>
              </div>

            </div>
            {/* Instagram */}

<div className="mt-7 flex gap-4">

  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-pink-500/10 text-2xl">
    📷
  </div>

  <div>
    <h3 className="font-semibold text-white">
      Instagram
    </h3>

    <a
      href="https://www.instagram.com/_sundhar_karthick_/"
      target="_blank"
      rel="noopener noreferrer"
      className="mt-1 inline-block text-slate-400 transition hover:text-amber-400"
    >
      @_sundhar_karthick_
    </a>
  </div>

</div>
{/* YouTube */}

<div className="mt-7 flex gap-4">

  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-2xl">
    ▶️
  </div>

  <div>
    <h3 className="font-semibold text-white">
      YouTube
    </h3>

    <a
  href="https://www.youtube.com/@sundharkarthick5507"
  target="_blank"
  rel="noopener noreferrer"
  className="mt-1 inline-block text-slate-400 transition hover:text-amber-400"
>
  @sundharkarthick5507
</a>
  </div>

</div>


            {/* Location */}

            <div className="mt-7 flex gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-2xl">
                📍
              </div>

              <div>
                <h3 className="font-semibold text-white">
                  Location
                </h3>

                <p className="mt-1 text-slate-400">
                  Tamil Nadu, India
                </p>
              </div>

            </div>


            {/* Working Hours */}

            <div className="mt-7 flex gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-2xl">
                🕒
              </div>

              <div>
                <h3 className="font-semibold text-white">
                  Working Hours
                </h3>

                <p className="mt-1 text-slate-400">
                  Monday – Saturday
                </p>

                <p className="text-slate-400">
                  10:00 AM – 7:00 PM
                </p>
              </div>

            </div>


            {/* Quote */}

            <div className="mt-10 rounded-xl border border-amber-500/20 bg-slate-800 p-5">

              <p className="text-sm leading-7 text-slate-300 italic">
                “Every stroke holds a story, every detail
                captures a moment, and every artwork is
                created to make your memories last forever.”
              </p>

              <p className="mt-3 text-sm font-semibold text-amber-400">
                — Sundhar Karthick Art Gallery
              </p>

            </div>

          </div>


          {/* Contact Form */}

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

            <h2 className="text-3xl font-bold">
              Send a Message
            </h2>

            <p className="mt-4 text-slate-400">
              Choose how you would like to contact us.
            </p>


            <form className="mt-8 space-y-6">


              {/* Name */}

              <div>
                <label className="mb-2 block text-slate-300">
                  Name
                  <span className="ml-1 text-red-400">*</span>
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-amber-400"
                />
              </div>


              {/* Email */}

              <div>
                <label className="mb-2 block text-slate-300">
                  Email
                  <span className="ml-1 text-red-400">*</span>
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-amber-400"
                />
              </div>


              {/* Phone */}

              <div>
                <label className="mb-2 block text-slate-300">
                  Phone
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-amber-400"
                />
              </div>


              {/* Subject */}

              <div>
                <label className="mb-2 block text-slate-300">
                  Subject
                  <span className="ml-1 text-red-400">*</span>
                </label>

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What would you like to ask?"
                  required
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-amber-400"
                />
              </div>


              {/* Message */}

              <div>
                <label className="mb-2 block text-slate-300">
                  Message
                  <span className="ml-1 text-red-400">*</span>
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Write your message..."
                  required
                  className="w-full resize-none rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-amber-400"
                />
              </div>


              {/* Buttons */}

              <div className="grid sm:grid-cols-2 gap-4 pt-2">

                {/* WhatsApp */}

                <button
                  type="button"
                  onClick={sendWhatsApp}
                  className="rounded-lg bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700 hover:scale-[1.02]"
                >
                  💬 Send via WhatsApp
                </button>


                {/* Email */}

                <button
                  type="button"
                  onClick={sendEmail}
                  className="rounded-lg bg-amber-500 px-5 py-3 font-semibold text-white transition hover:bg-amber-600 hover:scale-[1.02]"
                >
                  ✉️ Send via Email
                </button>

              </div>

            </form>

          </div>

        </div>

      </section>

    </div>
  );
}
