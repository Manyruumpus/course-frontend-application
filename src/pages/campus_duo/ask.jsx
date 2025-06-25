import React from 'react';
import { useNavigate } from 'react-router-dom';

/* ---------- Card ---------- */
const ActionCard = ({
  icon,
  title,
  description,
  ctaText,
  accent = '',
  onClick,         
}) => (
  <div
    className={`flex flex-col items-center gap-4 rounded-xl border border-slate-700
                bg-slate-800/60 p-8 text-center shadow-md transition
                hover:-translate-y-1 hover:shadow-lg ${accent}`}
  >
    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-900">
      {icon}
    </div>

    <h3 className="text-xl font-semibold text-white">{title}</h3>
    <p className="text-sm text-slate-300">{description}</p>

    <button
      type="button"
      className="mt-4 inline-flex items-center gap-2 rounded-md bg-emerald-500 px-4
                 py-2 text-sm font-medium text-white hover:bg-emerald-400
                 focus:outline-none focus:ring-2 focus:ring-emerald-300"
      onClick={onClick}      
    >
      {ctaText} →
    </button>
  </div>
);


const Ask = () => {
  const navigate = useNavigate();

  const handleSignUp  = () => navigate('/campus_duo/login');
  const handleImport  = () => navigate('/campus_duo/verify');
  const handleLogin   = () => navigate('/campus_duo/login');

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 px-4 py-16">
      <header className="mx-auto mb-12 max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Campus Duo
        </h1>
        <p className="mt-2 text-lg text-slate-300">Choose how you’d like to get started</p>
      </header>

      <section className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <ActionCard
          icon={<span className="text-2xl text-emerald-400">🎓</span>}
          title="New User"
          description="Create a brand-new profile and join the Campus Duo community."
          ctaText="Sign Up"
          accent="hover:bg-emerald-500/10"
          onClick={handleSignUp}
        />

        <ActionCard
          icon={<span className="text-2xl text-sky-400">📚</span>}
          title="Import from Study Buddy"
          description="Sign in with your IITK Study Buddy account and automatically import your profile data."
          ctaText="Import & Continue"
          accent="hover:bg-sky-500/10"
          onClick={handleImport}
        />

        <ActionCard
          icon={<span className="text-2xl text-pink-400">🔑</span>}
          title="Existing User"
          description="Already on Campus Duo? Log in to pick up where you left off."
          ctaText="Log In"
          accent="hover:bg-pink-500/10"
          onClick={handleLogin}
        />
      </section>
    </main>
  );
};

export default Ask;
