//------------------------------------//
// Define parameters.
//------------------------------------//

// Define comprehension thresholds.
var max_errors = 0;

// Define images to preload.
preload_images = [
  "img/instructions/instructions1.png",
  "img/instructions/instructions2.png",
  "img/instructions/instructions3.png",
  "img/instructions/instructions4.png",
  "img/instructions/instructions5.png",
  "img/instructions/instructions6.png",
  "img/instructions/instructions7.png",
  "img/instructions/instructions8.png",
  "img/instructions/instructions9.png",
  "img/instructions/instructions10.png",
  "img/instructions/instructions11.png",
  "img/instructions/instructions12.png",
  "img/instructions/instructions13.png",
  "img/instructions/instructions14.png",
  "img/instructions/instructions15.png",
  "img/instructions/instructions16.png",
  "img/instructions/instructions17.png",
  "img/instructions/instructions18.png",
  "img/instructions/instructions19.png",
  "img/instructions/ready.png",
  "img/instructions/finish.png",
  "img/instructions/end.png",
  "img/instructions/pause.png",
  "img/instructions/explicit1.png",
  "img/instructions/explicit2.png",
  "img/machines/machine1.png",
  "img/machines/machine2.png",
  "img/machines/machine3.png",
  "img/machines/machine4.png",
  "img/machines/machine5.png",
  "img/machines/machine6.png",
//  "img/shark.png",
//  "img/turtle.png",
//  "img/fish.png",
//  "img/tiger.png",
  "img/replay.png",
];

// Removed preload_audio array since we're not using audio.
// preload_audio = [
//   "audio/instructions1.wav",
//   "audio/instructions2.wav",
//   // ... more audio files
// ];

//------------------------------------//
// Define Instructions Block #1
//------------------------------------//

// Updated instruction trials to use 'instructions' plugin and removed audio stimuli.
var instructions01a = {
  type: 'instructions',
  pages: [
    `<img src="img/instructions/instructions1.png" style="${style}"></img>`,
  ],
  show_clickable_nav: true,
};

var instructions01b = {
  type: 'instructions',
  pages: [
    `<img src="img/instructions/instructions2.png" style="${style}"></img>`,
  ],
  show_clickable_nav: true,
};

var instructions01c = {
  type: 'instructions',
  pages: [
    `<img src="img/instructions/instructions3.png" style="${style}"></img>`,
  ],
  show_clickable_nav: true,
};

var instructions01d = {
  type: 'instructions',
  pages: [
    `<img src="img/instructions/instructions4.png" style="${style}"></img>`,
  ],
  show_clickable_nav: true,
};

var instructions01e = {
  type: 'instructions',
  pages: [
    `<img src="img/instructions/instructions5.png" style="${style}"></img>`,
  ],
  show_clickable_nav: true,
};

// Practice trials #1.
// Assuming 'fcp-practice' doesn't require audio changes.
var practice01 = {
  type: 'fcp-practice',
  arcade_colors: ['#EDC948', '#46d3c8'],
  correct: 1,
  valid_responses_s2: [37],
  timeline: [
    { arcade_outcomes: [10, 0] },
    { arcade_outcomes: [10, 0] },
    { arcade_outcomes: [0, 10] },
    { arcade_outcomes: [10, 0] },
    { arcade_outcomes: [10, 0] },
  ],
  data: { phase: 'practice' },
};

var instructions02a = {
  type: 'instructions',
  pages: [
    `<img src="img/instructions/instructions6.png" style="${style}"></img>`,
  ],
  show_clickable_nav: true,
};

var instructions02b = {
  type: 'instructions',
  pages: [
    `<img src="img/instructions/instructions7.png" style="${style}"></img>`,
  ],
  show_clickable_nav: true,
};

var instructions02c = {
  type: 'instructions',
  pages: [
    `<img src="img/instructions/instructions8.png" style="${style}"></img>`,
  ],
  show_clickable_nav: true,
};

// Quiz #1.
var quiz01 = {
  type: 'fcp-comprehension',
  prompts: [
    "<b><i>True</i> or <i>False</i>:</b> Winning or losing at a slot machine depends only on how lucky that machine is.",
    "<b><i>True</i> or <i>False</i>:</b> Some slot machines may be luckier than others.",
  ],
  correct: ["true", "true"],
};

//------------------------------------//
// Define Instructions Block #2
//------------------------------------//

var instructions03a = {
  type: 'instructions',
  pages: [
    `<img src="img/instructions/instructions9.png" style="${style}"></img>`,
  ],
  show_clickable_nav: true,
};

var instructions03b = {
  type: 'instructions',
  pages: [
    `<img src="img/instructions/instructions10.png" style="${style}"></img>`,
  ],
  show_clickable_nav: true,
};

// Practice trials #2.
var practice02 = {
  type: 'fcp-trial',
  arcade_colors: ['#EDC948', '#46d3c8'],
  arcade_outcomes: [10, 10],
  bonus_offer: 0,
  correct: 1,
  practice_key: 38,
  data: { phase: 'practice' },
};

// Instructions Block #3.
var instructions04a = {
  type: 'instructions',
  pages: [
    `<img src="img/instructions/instructions11.png" style="${style}"></img>`,
  ],
  show_clickable_nav: true,
};

// Practice trials #3.
var practice03 = {
  type: 'fcp-trial',
  arcade_colors: ['#EDC948', '#46d3c8'],
  arcade_outcomes: [10, 10],
  bonus_offer: 6,
  correct: 1,
  practice_key: 40,
  data: { phase: 'practice' },
};

var instructions05a = {
  type: 'instructions',
  pages: [
    `<img src="img/instructions/instructions12.png" style="${style}"></img>`,
  ],
  show_clickable_nav: true,
};

var instructions05b = {
  type: 'instructions',
  pages: [
    `<img src="img/instructions/instructions13.png" style="${style}"></img>`,
  ],
  show_clickable_nav: true,
};

var instructions05c = {
  type: 'instructions',
  pages: [
    `<img src="img/instructions/instructions14.png" style="${style}"></img>`,
  ],
  show_clickable_nav: true,
};

//------------------------------------//
// Define Instructions Block #4
//------------------------------------//

var instructions06a = {
  type: 'instructions',
  pages: [
    `<img src="img/instructions/instructions15.png" style="${style}"></img>`,
  ],
  show_clickable_nav: true,
};

var instructions06b = {
  type: 'instructions',
  pages: [
    `<img src="img/instructions/instructions16.png" style="${style}"></img>`,
  ],
  show_clickable_nav: true,
};

var instructions06c = {
  type: 'instructions',
  pages: [
    `<img src="img/instructions/instructions17.png" style="${style}"></img>`,
  ],
  show_clickable_nav: true,
};

var instructions06d = {
  type: 'instructions',
  pages: [
    `<img src="img/instructions/instructions18.png" style="${style}"></img>`,
  ],
  show_clickable_nav: true,
};

var instructions06e = {
  type: 'instructions',
  pages: [
    `<img src="img/instructions/instructions19.png" style="${style}"></img>`,
  ],
  show_clickable_nav: true,
};

// Quiz #2.
var quiz02 = {
  type: 'fcp-comprehension',
  prompts: [
    "<b><i>True</i> or <i>False</i>:</b> How lucky a slot machine is changes over time.",
    "<b><i>True</i> or <i>False</i>:</b> How lucky a slot machine is changes if it is on the left or the right side of the screen.",
    "<b><i>True</i> or <i>False</i>:</b> How lucky a slot machine is depends on whether you or the computer chooses it.",
    "<b><i>True</i> or <i>False</i>:</b> The tokens I earn will affect my bonus payment.",
  ],
  correct: ["true", "false", "false", "true"],
};

//------------------------------------//
// Define Explicit Instructions
//------------------------------------//

var explicit_instructions1 = {
  type: 'instructions',
  pages: [
    `<img src="img/instructions/explicit1.png" style="${style}"></img>`,
  ],
  show_clickable_nav: true,
};

var explicit_instructions2 = {
  type: 'instructions',
  pages: [
    `<img src="img/instructions/explicit2.png" style="${style}"></img>`,
  ],
  show_clickable_nav: true,
};

//------------------------------------//
// Define Instruction Loops
//------------------------------------//

var instructions_loop_01 = {
  timeline: [
    instructions01a,
    instructions01b,
    instructions01c,
    instructions01d,
    instructions01e,
    practice01,
    instructions02a,
    instructions02b,
    instructions02c,
    quiz01,
  ],
  loop_function: function (data) {
    // Extract number of errors.
    const num_errors = data.values().slice(-1)[0].num_errors;

    // Check if instructions should repeat.
    return num_errors > max_errors;
  },
};

var instructions_loop_02 = {
  timeline: [
    instructions03a,
    instructions03b,
    practice02,
    instructions04a,
    practice03,
    instructions05a,
    instructions05b,
    instructions05c,
  ],
};

var instructions_loop_03 = {
  timeline: [
    instructions06a,
    instructions06b,
    instructions06c,
    instructions06d,
    instructions06e,
    quiz02,
  ],
  loop_function: function (data) {
    // Extract number of errors.
    const num_errors = data.values().slice(-1)[0].num_errors;

    // Check if instructions should repeat.
    return num_errors > max_errors;
  },
};

var explicit_instructions = {
  timeline: [explicit_instructions1, explicit_instructions2],
};
