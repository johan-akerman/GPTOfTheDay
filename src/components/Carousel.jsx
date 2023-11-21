import CarouselCard from "./CarouselCard";

import adventure_master_gpt from "../images/gpts/adventure_master_gpt.png";
import alphanotes from "../images/gpts/alphanotes.png";
import ankify from "../images/gpts/ankify.png";
import bro_bot from "../images/gpts/bro_bot.png";
import chainstack_gpt from "../images/gpts/chainstack_gpt.png";
import database_builder from "../images/gpts/database_builder.png";
import flight_coach from "../images/gpts/flight_coach.png";
import job_finder from "../images/gpts/job_finder.png";
import labyrinth_lord from "../images/gpts/labyrinth_lord.png";
import marc_gpt from "../images/gpts/marc_gpt.png";
import mystery_master_game from "../images/gpts/mystery_master_game.png";
import nanotube from "../images/gpts/nanotube.png";
import pilot_mentor from "../images/gpts/pilot_mentor.png";
import rust_samurai from "../images/gpts/rust_samurai.png";
import thread_weaver from "../images/gpts/thread_weaver.png";
import tubelnsight from "../images/gpts/tubelnsight.png";

export default function Carousel() {
  const data = [
    {
      title: "Adventure Master GPT",
      creator: "Bryan Robbins",
      image: adventure_master_gpt,
    },

    {
      title: "Alpha Notes",
      creator: "Davide Zambiasi",
      image: alphanotes,
    },

    {
      title: "Ankify",
      creator: "Josh Villocido",
      image: ankify,
    },

    {
      title: "Bro Bot",
      creator: "Run the Prompts",
      image: bro_bot,
    },

    {
      title: "Chainstack GPT",
      creator: "Davide",
      image: chainstack_gpt,
    },

    {
      title: "Database Builder",
      creator: "Engine Labs",
      image: database_builder,
    },

    {
      title: "Flight Coach",
      creator: "Davide",
      image: flight_coach,
    },

    {
      title: "Job Finder",
      creator: "Careerpals",
      image: job_finder,
    },

    {
      title: "Labyrinth Lord",
      creator: "Sofian",
      image: labyrinth_lord,
    },

    {
      title: "MarcGPT",
      creator: "Marc Randolph",
      image: marc_gpt,
    },

    {
      title: "Mystery Master",
      creator: "Davide",
      image: mystery_master_game,
    },

    {
      title: "Nanotube",
      creator: "Nanotube",
      image: nanotube,
    },

    {
      title: "Pilot Mentor",
      creator: "Davide Zambiasi",
      image: pilot_mentor,
    },

    {
      title: "Rust Samurai",
      creator: "Safuari.com",
      image: rust_samurai,
    },

    {
      title: "Thread Weaver",
      creator: "Davide Zambiasi",
      image: thread_weaver,
    },

    {
      title: "Tubelnsight",
      creator: "Charly",
      image: tubelnsight,
    },
  ];

  let reversedGpts = [...data].reverse();

  return (
    <div className="w-screen py-12">
      <h1 className="text-center block uppercase tracking-wide text-darkBrown font-bold mb-6 px-6 text-lg">
        Featuring the best GPT creators today. Everyday.
      </h1>

      <div className="w-screen  mx-auto overflow-x-hidden text-center gap-12 ">
        <div className="flex gap-8 animate-[wiggle_40s_linear_infinite] -translate-x-1/2 flex-row w-fit mb-6  ml-28 ">
          {data.map((gpt, id) => (
            <CarouselCard
              title={gpt.title}
              creator={gpt.creator}
              image={gpt.image}
              key={id}
            />
          ))}
        </div>
        <div className="flex gap-8 animate-[wiggle_40s_linear_infinite] -translate-x-1/2 flex-row w-fit">
          {reversedGpts.map((gpt, id) => (
            <CarouselCard
              title={gpt.title}
              creator={gpt.creator}
              image={gpt.image}
              key={id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
