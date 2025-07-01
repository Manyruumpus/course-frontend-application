// src/components/AboutSection.jsx
import React from 'react';

const About = () => (
  <section
    id="about"
    className="py-20 bg-gradient-to-r from-pink-50 via-rose-50 to-purple-50"
  >
    <div className="mx-auto max-w-4xl px-6 text-center">
      <h2 className="mb-4 text-4xl font-extrabold text-rose-800">
        About Campus Duo
      </h2>

      <p className="mb-10 text-lg text-rose-600">
        Built at IIT Kanpur, Campus Duo is the college-exclusive dating platform
        where genuine, in-person connections replace endless swipes. Verified
        IITK accounts only, meet-ups at your favourite campus spots, and a
        matching engine tuned to what really matters to students.
      </p>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {/* 1 ─ Genuine Chemistry */}
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h3 className="mb-2 text-2xl font-semibold text-rose-800">
            Genuine Chemistry
          </h3>
          <p className="text-rose-600">
            Go beyond bios—discover people who vibe with your playlists, clubs,
            and late-night maggi cravings.
          </p>
        </div>

        {/* 2 ─ Interest-Based Matches */}
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h3 className="mb-2 text-2xl font-semibold text-rose-800">
            Interest-Based Matches
          </h3>
          <p className="text-rose-600">
            We pair you on passions—coding jams, film marathons, trekking
            weekends—so the first convo writes itself.
          </p>
        </div>

        {/* 3 ─ Campus-First Safety */}
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h3 className="mb-2 text-2xl font-semibold text-rose-800">
            Campus-First Safety
          </h3>
          <p className="text-rose-600">
            IITK-email verification and suggested meeting spots like CCD,
            Library lawns, or Hall canteens keep every date comfy & secure.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default About;
