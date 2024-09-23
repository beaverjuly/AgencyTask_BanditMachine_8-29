// Define image scaling CSS.
const style = "width:auto; height:auto; max-width:100%; max-height:80vh;";

// Define reward probabilities (per context)
const probs = [
    [0.90, 0.10],
    [0.60, 0.40],
];

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

// Generate the change points for easy and hard trials
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

// Generate change points for 'easy' and 'hard' trials
let easyChangePoints, hardChangePoints;
try {
    easyChangePoints = generateChangePoints();
    hardChangePoints = generateChangePoints();
} catch (error) {
    console.error('Error generating change points:', error);
}

// Function to predefine outcomes based on the probabilities
function generatePredefinedOutcomes(contexts, trialsPerContext) {
    let predefinedOutcomes = [];

    for (let context = 0; context < contexts.length; context++) {
        let contextOutcomes = [];
        for (let i = 0; i < trialsPerContext[context]; i++) {
            contextOutcomes.push(Math.random() < probs[context][0] ? rewards[0] : rewards[1]);
        }
        predefinedOutcomes.push(contextOutcomes);
    }

    return predefinedOutcomes;
}

// Calculate total trials per context
const totalEasyTrials = easyChangePoints.reduce((sum, points) => sum + points, 0);
const totalHardTrials = hardChangePoints.reduce((sum, points) => sum + points, 0);

// Generate predefined outcomes for each context
const predefinedOutcomes = generatePredefinedOutcomes(probs, [totalEasyTrials, totalHardTrials]);

// Function to generate predefined token offers
function generatePredefinedTokenOffers() {
    let predefinedTokenOffers = [];

    // Define counts for each token value
    const tokenCounts = { 0: 30, 1: 30, 2: 30, 3: 30, 4: 30, 5: 30, 6: 30 };

    // Populate predefinedTokenOffers with the values
    for (let tokenValue in tokenCounts) {
        predefinedTokenOffers = predefinedTokenOffers.concat(
            Array(tokenCounts[tokenValue]).fill(parseInt(tokenValue))
        );
    }

    // Shuffle predefined token offers
    predefinedTokenOffers = jsPsych.randomization.shuffle(predefinedTokenOffers);
    return predefinedTokenOffers;
}

// Generate predefined token offers
const predefinedTokenOffers = generatePredefinedTokenOffers();

// Generate trial types based on change points
let trialTypes = [];
let totalTrialsGenerated = 0;
function generateTrialTypes(easyChangePoints, hardChangePoints) {
    let trialTypes = [];
    let easyIndex = 0;
    let hardIndex = 0;

    while (totalTrialsGenerated < 180) {
        if (easyIndex < easyChangePoints.length) {
            // Add 'easy' trials
            for (let i = 0; i < easyChangePoints[easyIndex]; i++) {
                trialTypes.push('easy');
                totalTrialsGenerated++;
            }
            easyIndex++;
        }
        if (totalTrialsGenerated >= 180) break;
        if (hardIndex < hardChangePoints.length) {
            // Add 'hard' trials
            for (let i = 0; i < hardChangePoints[hardIndex]; i++) {
                trialTypes.push('hard');
                totalTrialsGenerated++;
            }
            hardIndex++;
        }
    }

    // Fill any remaining trials to reach 180
    while (totalTrialsGenerated < 180) {
        trialTypes.push('easy');
        totalTrialsGenerated++;
    }

    return trialTypes;
}

// Generate trialTypes array
try {
    trialTypes = generateTrialTypes(easyChangePoints, hardChangePoints);
} catch (error) {
    console.error('Error generating trial types:', error);
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

// Define block structure
const factors = {
    context: [0, 1]
};

// Construct trials
var fcp_trials = [];
var trial_no = 0;
var predefinedOutcomeIndex = [0, 0]; // Index to track predefined outcomes for each context
var predefinedTokenOfferIndex = 0; // Index to track predefined token offers

try {
    trialTypes.forEach(trialType => {
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
            let predefinedReward = predefinedOutcomes[context][predefinedOutcomeIndex[context]];
            predefinedOutcomeIndex[context]++; // Move to the next predefined outcome

            // Use predefined token offer
            let predefinedTokenOffer = predefinedTokenOffers[predefinedTokenOfferIndex % predefinedTokenOffers.length];
            predefinedTokenOfferIndex++; // Move to the next predefined token offer

            try {
                if (Math.random() < 0.5) {
                    info.correct = 1;
                    info.arcade_ids = [2 * info.context, 2 * info.context + 1];
                    info.arcade_outcomes = [predefinedReward, rewards[1 - rewards.indexOf(predefinedReward)]];
                    info.arcade_colors = arcade_colors[info.context];
                    info.arcade_probs = probs[info.context];
                } else {
                    info.correct = 0;
                    info.arcade_ids = [2 * info.context + 1, 2 * info.context];
                    info.arcade_outcomes = [rewards[1 - rewards.indexOf(predefinedReward)], predefinedReward];
                    info.arcade_colors = arcade_colors[info.context].slice().reverse();
                    info.arcade_probs = probs[info.context].slice().reverse();
                }

                // Construct trial
                const trial = {
                    type: 'fcp-trial',
                    bonus_offer: predefinedTokenOffer,
                    correct: info.correct,
                    arcade_outcomes: info.arcade_outcomes,
                    arcade_colors: info.arcade_colors,
                    data: {
                        context: info.context,
                        reward_prob_L: info.arcade_probs[0],
                        reward_prob_R: info.arcade_probs[1],
                        arcade_id_L: info.arcade_ids[0],
                        arcade_id_R: info.arcade_ids[1],
                        phase: 'experiment',
                        trial: trial_no + 1,
                        block: Math.floor(trial_no / 45) + 1,
                        trial_type: trialType
                    },
                };

                // Append trial
                fcp_trials.push(trial);

                // Increment trial counter
                trial_no++;

            } catch (error) {
                console.error('Error constructing trial:', error);
            }
        });
    });
} catch (error) {
    console.error('Error iterating over trialTypes:', error);
}

// Define explicit knowledge task.
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
