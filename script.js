let isMetric = true;
let isAdvanced = false;

const metricBtn = document.getElementById('metricBtn');
const imperialBtn = document.getElementById('imperialBtn');
const simpleBtn = document.getElementById('simpleBtn');
const advancedBtn = document.getElementById('advancedBtn');
const form = document.getElementById('calculatorForm');
const advancedInputs = document.getElementById('advancedInputs');
const femaleOnly = document.getElementById('femaleOnly');
const genderInputs = document.querySelectorAll('input[name="gender"]');
const modal = document.getElementById('measurementGuide');
const closeModal = document.querySelector('.close');
const helpButtons = document.querySelectorAll('.help-btn');

loadSavedData();

metricBtn.addEventListener('click', () => toggleUnits(true));
imperialBtn.addEventListener('click', () => toggleUnits(false));
simpleBtn.addEventListener('click', () => toggleMode(false));
advancedBtn.addEventListener('click', () => toggleMode(true));

genderInputs.forEach(input => {
    input.addEventListener('change', () => {
        updateGenderFields();
        saveData();
    });
});

helpButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const measurement = e.target.dataset.measurement;
        showMeasurementGuide(measurement);
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    calculateBodyFat();
});

const inputFields = ['weight', 'height', 'neck', 'waist', 'hip', 'chest', 'bicep', 'forearm', 'thigh', 'calf'];
inputFields.forEach(fieldId => {
    const input = document.getElementById(fieldId);
    if (input) {
        input.addEventListener('input', saveData);
    }
});

function toggleUnits(metric) {
    isMetric = metric;
    metricBtn.classList.toggle('active', metric);
    imperialBtn.classList.toggle('active', !metric);

    const unitLabels = document.querySelectorAll('.unit-label');
    unitLabels.forEach(label => {
        const text = label.textContent;
        if (text.includes('kg') || text.includes('lb')) {
            label.textContent = isMetric ? '(kg)' : '(lb)';
        } else {
            label.textContent = isMetric ? '(cm)' : '(in)';
        }
    });

    saveData();
}

function toggleMode(advanced) {
    isAdvanced = advanced;
    simpleBtn.classList.toggle('active', !advanced);
    advancedBtn.classList.toggle('active', advanced);
    advancedInputs.style.display = advanced ? 'block' : 'none';
    saveData();
}

function updateGenderFields() {
    const gender = document.querySelector('input[name="gender"]:checked').value;
    femaleOnly.style.display = gender === 'female' ? 'block' : 'none';
    if (gender === 'female') {
        document.getElementById('hip').required = true;
    } else {
        document.getElementById('hip').required = false;
    }
}

function calculateBodyFat() {
    const gender = document.querySelector('input[name="gender"]:checked').value;
    let weight = parseFloat(document.getElementById('weight').value);
    let height = parseFloat(document.getElementById('height').value);
    let neck = parseFloat(document.getElementById('neck').value);
    let waist = parseFloat(document.getElementById('waist').value);
    let hip = gender === 'female' ? parseFloat(document.getElementById('hip').value) : 0;

    if (!isMetric) {
        weight = weight * 0.453592;
        height = height * 2.54;
        neck = neck * 2.54;
        waist = waist * 2.54;
        hip = hip * 2.54;
    }

    let bodyFatPercentage;

    if (gender === 'male') {
        bodyFatPercentage = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
    } else {
        bodyFatPercentage = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
    }

    if (isAdvanced) {
        const chest = parseFloat(document.getElementById('chest').value) || 0;
        const bicep = parseFloat(document.getElementById('bicep').value) || 0;
        const forearm = parseFloat(document.getElementById('forearm').value) || 0;
        const thigh = parseFloat(document.getElementById('thigh').value) || 0;
        const calf = parseFloat(document.getElementById('calf').value) || 0;

        if (chest && bicep && forearm && thigh && calf) {
            let adjustedBF = bodyFatPercentage;
            const avgCircumference = (chest + bicep + forearm + thigh + calf) / 5;
            const circumferenceRatio = waist / avgCircumference;

            if (circumferenceRatio > 1.5) {
                adjustedBF += 1.5;
            } else if (circumferenceRatio < 0.8) {
                adjustedBF -= 1.0;
            }

            bodyFatPercentage = adjustedBF;
        }
    }

    const bmi = weight / Math.pow(height / 100, 2);
    const fatMass = weight * (bodyFatPercentage / 100);
    const leanMass = weight - fatMass;

    displayResults(bodyFatPercentage, fatMass, leanMass, bmi, gender, weight);
}

function displayResults(bodyFatPercentage, fatMass, leanMass, bmi, gender, weight) {
    const resultsDiv = document.getElementById('results');
    const bodyFatEl = document.getElementById('bodyFatPercentage');
    const categoryEl = document.getElementById('category');
    const fatMassEl = document.getElementById('fatMass');
    const leanMassEl = document.getElementById('leanMass');
    const bmiEl = document.getElementById('bmi');
    const interpretationEl = document.getElementById('interpretationText');

    bodyFatEl.textContent = bodyFatPercentage.toFixed(1);

    const weightUnit = isMetric ? 'kg' : 'lb';
    const displayFatMass = isMetric ? fatMass : fatMass * 2.20462;
    const displayLeanMass = isMetric ? leanMass : leanMass * 2.20462;

    fatMassEl.textContent = `${displayFatMass.toFixed(1)} ${weightUnit}`;
    leanMassEl.textContent = `${displayLeanMass.toFixed(1)} ${weightUnit}`;
    bmiEl.textContent = bmi.toFixed(1);

    const { category, interpretation } = getBodyFatCategory(bodyFatPercentage, gender);
    categoryEl.textContent = category;
    interpretationEl.textContent = interpretation;

    resultsDiv.style.display = 'block';
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function getBodyFatCategory(percentage, gender) {
    let category, interpretation;

    if (gender === 'male') {
        if (percentage < 6) {
            category = 'Essential Fat';
            interpretation = 'This is below the essential fat level and may pose health risks. Essential fat is necessary for normal physiological function.';
        } else if (percentage < 14) {
            category = 'Athletic';
            interpretation = 'This range is typical for athletes. It indicates excellent fitness and low body fat, common among competitive athletes.';
        } else if (percentage < 18) {
            category = 'Fitness';
            interpretation = 'This is a healthy range that indicates good fitness levels. You maintain an active lifestyle with regular exercise.';
        } else if (percentage < 25) {
            category = 'Average';
            interpretation = 'This falls within the average range for men. While not unhealthy, there may be room for improvement through diet and exercise.';
        } else {
            category = 'Above Average';
            interpretation = 'This is above the average range. Consider consulting with a healthcare provider about healthy weight management strategies.';
        }
    } else {
        if (percentage < 14) {
            category = 'Essential Fat';
            interpretation = 'This is below the essential fat level and may pose health risks. Women require higher essential fat levels than men for normal physiological function.';
        } else if (percentage < 21) {
            category = 'Athletic';
            interpretation = 'This range is typical for female athletes. It indicates excellent fitness and low body fat, common among competitive athletes.';
        } else if (percentage < 25) {
            category = 'Fitness';
            interpretation = 'This is a healthy range that indicates good fitness levels. You maintain an active lifestyle with regular exercise.';
        } else if (percentage < 32) {
            category = 'Average';
            interpretation = 'This falls within the average range for women. While not unhealthy, there may be room for improvement through diet and exercise.';
        } else {
            category = 'Above Average';
            interpretation = 'This is above the average range. Consider consulting with a healthcare provider about healthy weight management strategies.';
        }
    }

    return { category, interpretation };
}

function showMeasurementGuide(measurement) {
    const guideTitle = document.getElementById('guideTitle');
    const guideContent = document.getElementById('guideContent');

    const guides = {
        neck: {
            title: 'How to Measure Neck',
            content: `
                <div class="measurement-guide-content">
                    <svg width="300" height="200" viewBox="0 0 300 200" style="display: block; margin: 20px auto;">
                        <ellipse cx="150" cy="100" rx="60" ry="80" fill="#f0d0b0" stroke="#333" stroke-width="2"/>
                        <ellipse cx="150" cy="50" rx="45" ry="50" fill="#f0d0b0" stroke="#333" stroke-width="2"/>
                        <line x1="90" y1="100" x2="40" y2="100" stroke="#e74c3c" stroke-width="3" marker-end="url(#arrowred)"/>
                        <line x1="210" y1="100" x2="260" y2="100" stroke="#e74c3c" stroke-width="3" marker-start="url(#arrowred)"/>
                        <text x="150" y="130" text-anchor="middle" fill="#e74c3c" font-weight="bold">Measure here</text>
                        <defs>
                            <marker id="arrowred" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                                <polygon points="0,0 10,5 0,10" fill="#e74c3c"/>
                            </marker>
                        </defs>
                    </svg>
                    <ul>
                        <li>Stand or sit upright with head level</li>
                        <li>Measure at the midpoint of the neck, below the larynx (Adam's apple)</li>
                        <li>Keep tape measure perpendicular to the long axis of the neck</li>
                        <li>Don't pull too tight - the tape should rest comfortably on the skin</li>
                    </ul>
                </div>
            `
        },
        waist: {
            title: 'How to Measure Waist',
            content: `
                <div class="measurement-guide-content">
                    <svg width="300" height="250" viewBox="0 0 300 250" style="display: block; margin: 20px auto;">
                        <ellipse cx="150" cy="80" rx="55" ry="65" fill="#f0d0b0" stroke="#333" stroke-width="2"/>
                        <ellipse cx="150" cy="150" rx="70" ry="60" fill="#e8f4f8" stroke="#333" stroke-width="2"/>
                        <ellipse cx="150" cy="210" rx="60" ry="40" fill="#e8f4f8" stroke="#333" stroke-width="2"/>
                        <ellipse cx="150" cy="160" rx="75" ry="10" fill="none" stroke="#e74c3c" stroke-width="3" stroke-dasharray="5,5"/>
                        <text x="150" y="135" text-anchor="middle" fill="#e74c3c" font-weight="bold">Measure at navel</text>
                        <line x1="75" y1="160" x2="30" y2="160" stroke="#e74c3c" stroke-width="2" marker-end="url(#arrowred2)"/>
                        <line x1="225" y1="160" x2="270" y2="160" stroke="#e74c3c" stroke-width="2" marker-start="url(#arrowred2)"/>
                        <defs>
                            <marker id="arrowred2" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                                <polygon points="0,0 10,5 0,10" fill="#e74c3c"/>
                            </marker>
                        </defs>
                    </svg>
                    <ul>
                        <li>Stand straight with abdomen relaxed</li>
                        <li>Measure at the level of the navel (belly button)</li>
                        <li>Keep tape measure horizontal and parallel to the floor</li>
                        <li>Measure at the end of normal exhalation</li>
                        <li>Don't suck in your stomach</li>
                    </ul>
                </div>
            `
        },
        hip: {
            title: 'How to Measure Hip',
            content: `
                <div class="measurement-guide-content">
                    <svg width="300" height="250" viewBox="0 0 300 250" style="display: block; margin: 20px auto;">
                        <ellipse cx="150" cy="100" rx="70" ry="60" fill="#e8f4f8" stroke="#333" stroke-width="2"/>
                        <ellipse cx="150" cy="160" rx="85" ry="50" fill="#e8f4f8" stroke="#333" stroke-width="2"/>
                        <ellipse cx="150" cy="160" rx="90" ry="10" fill="none" stroke="#e74c3c" stroke-width="3" stroke-dasharray="5,5"/>
                        <text x="150" y="140" text-anchor="middle" fill="#e74c3c" font-weight="bold">Widest point</text>
                        <line x1="60" y1="160" x2="20" y2="160" stroke="#e74c3c" stroke-width="2" marker-end="url(#arrowred3)"/>
                        <line x1="240" y1="160" x2="280" y2="160" stroke="#e74c3c" stroke-width="2" marker-start="url(#arrowred3)"/>
                        <defs>
                            <marker id="arrowred3" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                                <polygon points="0,0 10,5 0,10" fill="#e74c3c"/>
                            </marker>
                        </defs>
                    </svg>
                    <ul>
                        <li>Stand with feet together</li>
                        <li>Measure at the widest point of the buttocks</li>
                        <li>Keep tape measure horizontal and parallel to the floor</li>
                        <li>Ensure tape is snug but not compressing the skin</li>
                    </ul>
                </div>
            `
        },
        chest: {
            title: 'How to Measure Chest',
            content: `
                <div class="measurement-guide-content">
                    <svg width="300" height="200" viewBox="0 0 300 200" style="display: block; margin: 20px auto;">
                        <ellipse cx="150" cy="60" rx="45" ry="50" fill="#f0d0b0" stroke="#333" stroke-width="2"/>
                        <ellipse cx="150" cy="120" rx="75" ry="55" fill="#e8f4f8" stroke="#333" stroke-width="2"/>
                        <ellipse cx="150" cy="110" rx="80" ry="10" fill="none" stroke="#e74c3c" stroke-width="3" stroke-dasharray="5,5"/>
                        <text x="150" y="95" text-anchor="middle" fill="#e74c3c" font-weight="bold">Nipple level</text>
                        <defs>
                            <marker id="arrowred4" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                                <polygon points="0,0 10,5 0,10" fill="#e74c3c"/>
                            </marker>
                        </defs>
                    </svg>
                    <ul>
                        <li>Stand straight with arms at sides</li>
                        <li>Measure around the fullest part of the chest (nipple level for men)</li>
                        <li>Keep tape measure horizontal</li>
                        <li>Measure at the end of normal exhalation</li>
                    </ul>
                </div>
            `
        },
        bicep: {
            title: 'How to Measure Bicep',
            content: `
                <div class="measurement-guide-content">
                    <svg width="300" height="200" viewBox="0 0 300 200" style="display: block; margin: 20px auto;">
                        <rect x="120" y="40" width="60" height="120" rx="30" fill="#f0d0b0" stroke="#333" stroke-width="2"/>
                        <ellipse cx="150" cy="100" rx="35" ry="15" fill="none" stroke="#e74c3c" stroke-width="3" stroke-dasharray="5,5"/>
                        <text x="150" y="85" text-anchor="middle" fill="#e74c3c" font-weight="bold">Largest part</text>
                        <defs>
                            <marker id="arrowred5" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                                <polygon points="0,0 10,5 0,10" fill="#e74c3c"/>
                            </marker>
                        </defs>
                    </svg>
                    <ul>
                        <li>Keep arm relaxed at your side (not flexed)</li>
                        <li>Measure around the largest part of the upper arm</li>
                        <li>Keep tape measure perpendicular to the arm</li>
                        <li>Measure on the dominant arm</li>
                    </ul>
                </div>
            `
        },
        forearm: {
            title: 'How to Measure Forearm',
            content: `
                <div class="measurement-guide-content">
                    <svg width="300" height="200" viewBox="0 0 300 200" style="display: block; margin: 20px auto;">
                        <path d="M 120 40 L 110 160 L 140 160 L 150 40 Z" fill="#f0d0b0" stroke="#333" stroke-width="2"/>
                        <path d="M 150 40 L 140 160 L 170 160 L 180 40 Z" fill="#f0d0b0" stroke="#333" stroke-width="2"/>
                        <ellipse cx="150" cy="90" rx="25" ry="12" fill="none" stroke="#e74c3c" stroke-width="3" stroke-dasharray="5,5"/>
                        <text x="150" y="75" text-anchor="middle" fill="#e74c3c" font-weight="bold">Largest part</text>
                    </svg>
                    <ul>
                        <li>Keep arm relaxed</li>
                        <li>Measure around the largest part of the forearm</li>
                        <li>Usually close to the elbow</li>
                        <li>Measure on the dominant arm</li>
                    </ul>
                </div>
            `
        },
        thigh: {
            title: 'How to Measure Thigh',
            content: `
                <div class="measurement-guide-content">
                    <svg width="300" height="250" viewBox="0 0 300 250" style="display: block; margin: 20px auto;">
                        <rect x="110" y="40" width="80" height="180" rx="40" fill="#f0d0b0" stroke="#333" stroke-width="2"/>
                        <ellipse cx="150" cy="100" rx="45" ry="15" fill="none" stroke="#e74c3c" stroke-width="3" stroke-dasharray="5,5"/>
                        <text x="150" y="80" text-anchor="middle" fill="#e74c3c" font-weight="bold">Upper thigh</text>
                    </svg>
                    <ul>
                        <li>Stand with feet slightly apart</li>
                        <li>Measure around the fullest part of the thigh</li>
                        <li>Usually just below the gluteal fold (where buttocks meet thigh)</li>
                        <li>Keep weight evenly distributed</li>
                    </ul>
                </div>
            `
        },
        calf: {
            title: 'How to Measure Calf',
            content: `
                <div class="measurement-guide-content">
                    <svg width="300" height="250" viewBox="0 0 300 250" style="display: block; margin: 20px auto;">
                        <path d="M 120 40 L 100 150 L 115 220 L 145 220 L 150 150 Z" fill="#f0d0b0" stroke="#333" stroke-width="2"/>
                        <path d="M 150 150 L 145 220 L 175 220 L 180 150 Z" fill="#f0d0b0" stroke="#333" stroke-width="2"/>
                        <ellipse cx="150" cy="130" rx="35" ry="12" fill="none" stroke="#e74c3c" stroke-width="3" stroke-dasharray="5,5"/>
                        <text x="150" y="115" text-anchor="middle" fill="#e74c3c" font-weight="bold">Largest part</text>
                    </svg>
                    <ul>
                        <li>Stand with feet flat on the floor</li>
                        <li>Measure around the largest part of the calf</li>
                        <li>Usually midway between knee and ankle</li>
                        <li>Keep weight evenly distributed</li>
                    </ul>
                </div>
            `
        }
    };

    const guide = guides[measurement];
    guideTitle.textContent = guide.title;
    guideContent.innerHTML = guide.content;
    modal.style.display = 'flex';
}

function saveData() {
    const data = {
        isMetric: isMetric,
        isAdvanced: isAdvanced,
        gender: document.querySelector('input[name="gender"]:checked').value,
        measurements: {}
    };

    inputFields.forEach(fieldId => {
        const input = document.getElementById(fieldId);
        if (input && input.value) {
            data.measurements[fieldId] = input.value;
        }
    });

    localStorage.setItem('bodyFatCalculatorData', JSON.stringify(data));
}

function loadSavedData() {
    const savedData = localStorage.getItem('bodyFatCalculatorData');
    if (!savedData) return;

    try {
        const data = JSON.parse(savedData);

        if (data.isMetric !== undefined) {
            toggleUnits(data.isMetric);
        }

        if (data.isAdvanced !== undefined) {
            toggleMode(data.isAdvanced);
        }

        if (data.gender) {
            const genderInput = document.querySelector(`input[name="gender"][value="${data.gender}"]`);
            if (genderInput) {
                genderInput.checked = true;
                updateGenderFields();
            }
        }

        if (data.measurements) {
            Object.keys(data.measurements).forEach(fieldId => {
                const input = document.getElementById(fieldId);
                if (input) {
                    input.value = data.measurements[fieldId];
                }
            });
        }
    } catch (e) {
        console.error('Error loading saved data:', e);
    }
}

updateGenderFields();