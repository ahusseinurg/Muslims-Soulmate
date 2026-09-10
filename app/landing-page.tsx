'use client';

import { Camera, Heart, MessageCircle, ShieldCheck, UserRound } from 'lucide-react';

export default function LandingPage({ onCreate }: { onCreate: () => void }) {
  return <section className="facebook-landing">
    <div className="landing-intro">
      <a className="landing-brand" href="/" aria-label="Muslims Soulmate home"><img src="/soulmate-icon.png" alt="Muslims Soulmate"/><span>muslims <strong>soulmate.</strong></span></a>
      <h1>Meaningful Muslim connections, all in one community.</h1>
      <p>Discover people, share status updates, message safely, join matchmaking groups, and meet with intention.</p>
      <div className="landing-points"><span><Heart size={20}/>Faith-centered profiles</span><span><MessageCircle size={20}/>Private conversations</span><span><Camera size={20}/>24-hour status updates</span></div>
    </div>
    <div className="landing-signup-card">
      <span className="landing-beta">PUBLIC BETA</span><h2>Start your profile</h2><p>Create a tester profile and explore the app as a real member. No ChatGPT login is required.</p>
      <button className="landing-create" onClick={onCreate}><UserRound size={20}/>Create my profile</button>
      <div className="landing-divider"><span>then</span></div>
      <ol><li><strong>1</strong><span>Add your basic details</span></li><li><strong>2</strong><span>Take two current camera photos</span></li><li><strong>3</strong><span>Connect with other testers</span></li></ol>
      <small><ShieldCheck size={16}/>18+ Muslims only. Please be respectful.</small>
    </div>
  </section>;
}
