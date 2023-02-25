import Trusted from "./Trusted";
import Stats from "./Stats";
import Breaker from "./Breaker";
import Team from "./Team";
import Reviews from "./Reviews";
import Reviews2 from "./Review2";

import React from 'react'


//imported every component i need for my entire bout section here so i can render it all at once with less code in my app.js file
export default function About() {
  return (
    <div>
    <Trusted />
    <Stats />
    <Reviews />
    <Reviews2 />
    <Breaker />
    <Team />
    </div>
  )
}
