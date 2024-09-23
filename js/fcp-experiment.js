// Define image scaling CSS.
const style = "width:auto; height:auto; max-width:100%; max-height:80vh;";

// Define reward probabilities (per context) for volatile block
const probsVolatile = [
    [0.90, 0.10],
    [0.60, 0.40],
];

// Define reward probabilities for stable block
const easyPairStable = { left: 0.9, right: 0.1 };
const hardPairStable = { left: 0.6, right: 0.4 };

// Define reward values.
const rewards = [10, 0];

// Define arcade colors.
const arcade_colors = jsPsych.randomization.shuffle([
    jsPsych.randomization.shuffle(["#D8271C", "#741CD8"]), // red, purple
    jsPsych.randomization.shuffle(["#1CD855", "#FA92F8"]), // green, pink
]);

// Define audio test.
var beep_test = {
    type: 'audio-keyboard-response',
    stimulus: 'audio/beep_loop.wav',
    choices: jsPsych.ALL_KEYS,
    prompt: 'Make sure your sound is turned on. </p> Then, press the space bar to proceed to the audio test.',
};

// Define audio test trials.
var audio_test_1 = {
    type: 'audio-test',
    stimulus: 'audio/turtle.wav',
    choices: ['repeat', 'fish', 'tiger', 'turtle', 'shark'],
    correct_answer: 3,
    prompt: 'Click on the word that you just heard.',
    incorrect_prompt: 'Incorrect, please adjust your volume and try again.',
    margin_vertical: '40px',
    margin_horizontal: '10px',
    button_html: [
        '<img src="img/replay.png" height="200px" width="200px"/>',
        '<img src="img/fish.png" height="200px" width="200px"/>',
        '<img src="img/tiger.png" height="200px" width="200px"/>',
        '<img src="img/turtle.png" height="200px" width="200px"/>',
        '<img src="img/shark.png" height="200px" width="200px"/>'
    ],
    post_trial_gap: 1000
};

var audio_test_2 = {
    type: 'audio-test',
    stimulus: 'audio/shark.wav',
    choices: ['repeat', 'turtle', 'shark', 'fish', 'tiger'],
    correct_answer: 2,
    prompt: 'Again, click on the word that you just heard.',
    incorrect_prompt: 'Incorrect, please adjust your volume and try again.',
    margin_vertical: '40px',
    margin_horizontal: '10px',
    button_html: [
        '<img src="img/replay.png" height="200px" width="200px"/>',
        '<img src="img/turtle.png" height="200px" width="200px"/>',
        '<img src="img/shark.png" height="200px" width="200px"/>',
        '<img src="img/fish.png" height="200px" width="200px"/>',
        '<img src="img/tiger.png" height="200px" width="200px"/>'
    ],
    post_trial_gap: 1000
};

// Generate the change points for easy and hard trials in the volatile block
function generateChangePoints() {
    let changePoints = [];
    let totalTrials = 0;
    let counter = 0;
    const maxIterations = 100; // Maximum iterations to avoid infinite loops

    try {
        while (totalTrials < 180 && counter < maxIterations) {
            let changePoint = Math.floor(Math.random() * 8) + 28; // Random number between 28 and 35
            if (totalTrials + changePoint > 180) {
                changePoint = 180 - totalTrials; // Adjust to fill up to 180 trials
            }
            changePoints.push(changePoint);
            totalTrials += changePoint;
            counter++;
            if (totalTrials >= 180) break;
        }

        if (counter >= maxIterations) {
            console.error('generateChangePoints: Iteration limit exceeded, potential issue');
        }
    } catch (error) {
        console.error('Error in generateChangePoints:', error);
    }

    return changePoints;
}

// Generate change points for 'easy' and 'hard' trials in volatile block
let easyChangePointsVolatile, hardChangePointsVolatile;
try {
    easyChangePointsVolatile = generateChangePoints();
    hardChangePointsVolatile = generateChangePoints();
} catch (error) {
    console.error('Error generating change points:', error);
}

// Function to predefine outcomes based on the probabilities
function generatePredefinedOutcomesVolatile(contexts, trialsPerContext) {
    let predefinedOutcomes = [];

    for (let context = 0; context < contexts.length; context++) {
        let contextOutcomes = [];
        for (let i = 0; i < trialsPerContext[context]; i++) {
            contextOutcomes.push(Math.random() < probsVolatile[context][0] ? rewards[0] : rewards[1]);
        }
        predefinedOutcomes.push(contextOutcomes);
    }

    return predefinedOutcomes;
}

// Calculate total trials per context in volatile block
const totalEasyTrialsVolatile = easyChangePointsVolatile.reduce((sum, points) => sum + points, 0);
const totalHardTrialsVolatile = hardChangePointsVolatile.reduce((sum, points) => sum + points, 0);

// Generate predefined outcomes for each context in volatile block
const predefinedOutcomesVolatile = generatePredefinedOutcomesVolatile(probsVolatile, [totalEasyTrialsVolatile, totalHardTrialsVolatile]);

// Function to generate predefined token offers
function generatePredefinedTokenOffers(totalTrials) {
    let predefinedTokenOffers = [];

    // Generate random token offers between 0 and 6
    for (let i = 0; i < totalTrials; i++) {
        predefinedTokenOffers.push(Math.floor(Math.random() * 7));
    }

    return predefinedTokenOffers;
}

// Generate predefined token offers for volatile block
const predefinedTokenOffersVolatile = generatePredefinedTokenOffers(180);

// Generate trial types based on change points for volatile block
let trialTypesVolatile = [];
let totalTrialsGeneratedVolatile = 0;
function generateTrialTypesVolatile(easyChangePoints, hardChangePoints) {
    let trialTypes = [];
    let easyIndex = 0;
    let hardIndex = 0;

    while (totalTrialsGeneratedVolatile < 180) {
        if (easyIndex < easyChangePoints.length) {
            // Add 'easy' trials
            for (let i = 0; i < easyChangePoints[easyIndex]; i++) {
                trialTypes.push('easy');
                totalTrialsGeneratedVolatile++;
            }
            easyIndex++;
        }
        if (totalTrialsGeneratedVolatile >= 180) break;
        if (hardIndex < hardChangePoints.length) {
            // Add 'hard' trials
            for (let i = 0; i < hardChangePoints[hardIndex]; i++) {
                trialTypes.push('hard');
                totalTrialsGeneratedVolatile++;
            }
            hardIndex++;
        }
    }

    // Fill any remaining trials to reach 180
    while (totalTrialsGeneratedVolatile < 180) {
        trialTypes.push('easy');
        totalTrialsGeneratedVolatile++;
    }

    return trialTypes;
}

// Generate trialTypesVolatile array
try {
    trialTypesVolatile = generateTrialTypesVolatile(easyChangePointsVolatile, hardChangePointsVolatile);
} catch (error) {
    console.error('Error generating trial types for volatile block:', error);
}

// Function to calculate the longest sequence of similar elements
function longestSequence(arr) {
    if (!Array.isArray(arr) || arr.length === 0) return 0;

    var seqmax = 0;
    var currentElement = null;
    var currentCount = 0;

    try {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === currentElement) {
                currentCount++;
            } else {
                currentElement = arr[i];
                currentCount = 1;
            }
            seqmax = Math.max(seqmax, currentCount);
        }
    } catch (error) {
        console.error('Error calculating the longest sequence:', error);
    }

    return seqmax;
}

// Define block structure for volatile block
const factorsVolatile = {
    context: [0, 1]
};

// Construct trials for volatile block
var volatile_trials = [];
var trial_no_volatile = 0;
var predefinedOutcomeIndexVolatile = [0, 0]; // Index to track predefined outcomes for each context
var predefinedTokenOfferIndexVolatile = 0; // Index to track predefined token offers

try {
    trialTypesVolatile.forEach(trialType => {
        let context = (trialType === 'easy') ? 0 : 1;

        // Create a block of trials for the current context
        var block = [{ context: context }];

        // Ensure the longest sequence is less than 5
        let seqmax = longestSequence(block.map(a => a.context));
        while (seqmax >= 5) {
            block = jsPsych.randomization.repeat([{ context: context }], 1);
            seqmax = longestSequence(block.map(a => a.context));
        }

        // Iterate over block trials
        block.forEach((info) => {
            // Use predefined outcomes
            let predefinedReward = predefinedOutcomesVolatile[context][predefinedOutcomeIndexVolatile[context]];
            predefinedOutcomeIndexVolatile[context]++; // Move to the next predefined outcome

            // Use predefined token offer
            let predefinedTokenOffer = predefinedTokenOffersVolatile[predefinedTokenOfferIndexVolatile % predefinedTokenOffersVolatile.length];
            predefinedTokenOfferIndexVolatile++; // Move to the next predefined token offer

            try {
                if (Math.random() < 0.5) {
                    info.correct = 1;
                    info.arcade_ids = [2 * context, 2 * context + 1];
                    info.arcade_outcomes = [predefinedReward, rewards[1 - rewards.indexOf(predefinedReward)]];
                    info.arcade_colors = arcade_colors[context];
                    info.arcade_probs = probsVolatile[context];
                } else {
                    info.correct = 0;
                    info.arcade_ids = [2 * context + 1, 2 * context];
                    info.arcade_outcomes = [rewards[1 - rewards.indexOf(predefinedReward)], predefinedReward];
                    info.arcade_colors = arcade_colors[context].slice().reverse();
                    info.arcade_probs = probsVolatile[context].slice().reverse();
                }

                // Construct trial
                const trial = {
                    type: 'fcp-trial',
                    bonus_offer: predefinedTokenOffer,
                    correct: info.correct,
                    arcade_outcomes: info.arcade_outcomes,
                    arcade_colors: info.arcade_colors,
                    data: {
                        context: context,
                        reward_prob_L: info.arcade_probs[0],
                        reward_prob_R: info.arcade_probs[1],
                        arcade_id_L: info.arcade_ids[0],
                        arcade_id_R: info.arcade_ids[1],
                        phase: 'volatile',
                        trial: trial_no_volatile + 1,
                        block: Math.floor(trial_no_volatile / 45) + 1,
                        trial_type: trialType
                    },
                };

                // Append trial
                volatile_trials.push(trial);

                // Increment trial counter
                trial_no_volatile++;

            } catch (error) {
                console.error('Error constructing trial for volatile block:', error);
            }
        });
    });
} catch (error) {
    console.error('Error iterating over trialTypes for volatile block:', error);
}

// ----------------------------
// Generate trials for stable block
// ----------------------------

const totalTrialsStable = 180;

// Define trial types for stable block
let trialTypesStable = Array(90).fill('easy').concat(Array(90).fill('hard'));
trialTypesStable = jsPsych.randomization.shuffle(trialTypesStable);

// Initialize counters for stable block
let easyTrialCounterStable = 0;
let hardTrialCounterStable = 0;

// Function to create predefined outcomes for stable block
function createPredefinedOutcomesStable(winRate, nTrials) {
    const winRateLeft = winRate;
    const winRateRight = 1 - winRate;
    let outcomes = [];
    let numWins = Math.floor(winRateLeft * nTrials);
    let numLosses = nTrials - numWins;
    outcomes = outcomes.concat(Array(numWins).fill(1), Array(numLosses).fill(0));
    // Add additional outcomes if the sum is less than nTrials due to rounding
    while (outcomes.length < nTrials) {
        outcomes.push(outcomes.length < winRateLeft * nTrials ? 1 : 0);
    }
    outcomes = jsPsych.randomization.shuffle(outcomes);
    return outcomes;
}

// Generate predefined outcomes for easy and hard conditions in stable block
const outcomesDictStable = {
    'easy': createPredefinedOutcomesStable(easyPairStable.left, 90),
    'hard': createPredefinedOutcomesStable(hardPairStable.left, 90)
};

// Pre-generate token offers for stable block
const predefinedTokenOffersStable = generatePredefinedTokenOffers(totalTrialsStable);

// Construct trials for stable block
let stable_trials = [];
let trialNoStable = 0;

let outcomeIndexStable = {
    'easy': 0,
    'hard': 0
};

try {
    trialTypesStable.forEach((trialType, i) => {
        let context = trialType === 'easy' ? 0 : 1;
        let leftProb, rightProb;

        if (trialType === 'easy') {
            leftProb = easyPairStable.left;
            rightProb = easyPairStable.right;
            easyTrialCounterStable++;
        } else {
            leftProb = hardPairStable.left;
            rightProb = hardPairStable.right;
            hardTrialCounterStable++;
        }

        // Use predefined outcomes
        let predefinedReward = outcomesDictStable[trialType][outcomeIndexStable[trialType]];
        outcomeIndexStable[trialType]++; // Increment the outcome index

        // Use predefined token offer
        let tokenOffer = predefinedTokenOffersStable[i];

        // Randomly decide the correct side
        let correctSide = Math.random() < 0.5 ? 'left' : 'right';
        let correct = correctSide === 'left' ? 1 : 0;

        // Assign outcomes and colors
        let arcade_ids, arcade_outcomes, arcade_colors_trial, arcade_probs;

        if (correct === 1) {
            arcade_ids = [2 * context, 2 * context + 1];
            arcade_outcomes = [predefinedReward, rewards[1 - rewards.indexOf(predefinedReward)]];
            arcade_colors_trial = arcade_colors[context];
            arcade_probs = [leftProb, rightProb];
        } else {
            arcade_ids = [2 * context + 1, 2 * context];
            arcade_outcomes = [rewards[1 - rewards.indexOf(predefinedReward)], predefinedReward];
            arcade_colors_trial = arcade_colors[context].slice().reverse();
            arcade_probs = [rightProb, leftProb];
        }

        // Construct the trial
        const trial = {
            type: 'fcp-trial',
            bonus_offer: tokenOffer,
            correct: correct,
            arcade_outcomes: arcade_outcomes,
            arcade_colors: arcade_colors_trial,
            data: {
                context: context,
                reward_prob_L: arcade_probs[0],
                reward_prob_R: arcade_probs[1],
                arcade_id_L: arcade_ids[0],
                arcade_id_R: arcade_ids[1],
                phase: 'stable',
                trial: trialNoStable + 1,
                block: Math.floor(trialNoStable / 45) + 1,
                trial_type: trialType
            },
        };

        // Append trial
        stable_trials.push(trial);

        trialNoStable++;
    });
} catch (error) {
    console.error('Error constructing trials for stable block:', error);
}

// ----------------------------
// Combine trials from both blocks in counterbalanced order
// ----------------------------

// Decide the order of blocks (counterbalanced across participants)
let blocksOrder;
if (Math.random() < 0.5) {
    blocksOrder = ['volatile', 'stable'];
} else {
    blocksOrder = ['stable', 'volatile'];
}

// Store block order in data for later analysis
const participantBlockOrder = blocksOrder.slice(); // Copy the array to avoid mutation

// Combine trials based on the block order
let all_trials = [];
blocksOrder.forEach(blockType => {
    if (blockType === 'volatile') {
        all_trials = all_trials.concat(volatile_trials);
    } else if (blockType === 'stable') {
        all_trials = all_trials.concat(stable_trials);
    }
});

// Adjust trial numbers after combining
all_trials.forEach((trial, index) => {
    trial.data.trial = index + 1;
    trial.data.block = Math.floor(index / 45) + 1;
});

// ----------------------------
// Define explicit knowledge task.
// ----------------------------
var explicit_knowledge = [];
try {
    var machines = jsPsych.randomization.shuffle([
        "img/machines/machine1.png",
        "img/machines/machine2.png",
        "img/machines/machine5.png",
        "img/machines/machine6.png"
    ]);

    for (let i = 0; i < machines.length; i++) {
        // Construct trial.
        const explicit_trial = {
            type: 'image-slider-response',
            stimulus: machines[i],
            stimulus_height: 300,
            min: 1,
            max: 9,
            start: 5,
            step: 1,
            labels: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            prompt: "If you played this machine 10 times, how many times would you win? <br><br>",
            button_label: "Submit response",
            data: {
                phase: 'explicit',
                stimulus: machines[i]
            },
        };

        // Append trial.
        explicit_knowledge.push(explicit_trial);
    }
} catch (error) {
    console.error('Error constructing explicit knowledge task:', error);
}
