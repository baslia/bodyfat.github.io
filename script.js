let isMetric = true;
let isAdvanced = false;
let currentLanguage = 'en';

const translations = {
    en: {
        title: "Precise Body Fat Calculator",
        subtitle: "Calculate your body fat percentage using the U.S. Navy method",
        metricBtn: "Metric (cm/kg)",
        imperialBtn: "Imperial (in/lb)",
        simpleMode: "Simple Mode",
        advancedMode: "Advanced Mode",
        male: "Male",
        female: "Female",
        weight: "Weight",
        height: "Height",
        neck: "Neck",
        waist: "Waist",
        hip: "Hip",
        chest: "Chest",
        bicep: "Bicep",
        forearm: "Forearm",
        thigh: "Thigh",
        calf: "Calf",
        additionalMeasurements: "Additional Measurements",
        calculateBtn: "Calculate Body Fat",
        yourResults: "Your Results",
        fatMass: "Fat Mass:",
        leanMass: "Lean Mass:",
        interpretation: "Interpretation",
        footer1: "This calculator uses the U.S. Navy body fat formula and additional measurements for enhanced accuracy.",
        footer2: "Results are estimates and should not replace professional medical advice.",
        howToMeasure: "How to Measure",
        measureNeck: "How to Measure Neck",
        measureWaist: "How to Measure Waist",
        measureHip: "How to Measure Hip",
        measureChest: "How to Measure Chest",
        measureBicep: "How to Measure Bicep",
        measureForearm: "How to Measure Forearm",
        measureThigh: "How to Measure Thigh",
        measureCalf: "How to Measure Calf",
        categoryEssential: "Essential Fat",
        categoryAthletic: "Athletic",
        categoryFitness: "Fitness",
        categoryAverage: "Average",
        categoryAbove: "Above Average",
        categoryObese: "Obese",
        interpMaleEssential: "This is below the essential fat level and may pose health risks. Essential fat is necessary for normal physiological function.",
        interpMaleAthletic: "This range is typical for athletes. It indicates excellent fitness and low body fat, common among competitive athletes.",
        interpMaleFitness: "This is a healthy range that indicates good fitness levels. You maintain an active lifestyle with regular exercise.",
        interpMaleAverage: "This falls within the average range for men. While not unhealthy, there may be room for improvement through diet and exercise.",
        interpMaleAbove: "This is above the average range. Consider consulting with a healthcare provider about healthy weight management strategies.",
        interpFemaleEssential: "This is below the essential fat level and may pose health risks. Women require higher essential fat levels than men for normal physiological function.",
        interpFemaleAthletic: "This range is typical for female athletes. It indicates excellent fitness and low body fat, common among competitive athletes.",
        interpFemaleFitness: "This is a healthy range that indicates good fitness levels. You maintain an active lifestyle with regular exercise.",
        interpFemaleAverage: "This falls within the average range for women. While not unhealthy, there may be room for improvement through diet and exercise.",
        interpFemaleAbove: "This is above the average range. Consider consulting with a healthcare provider about healthy weight management strategies.",
        methodsTitle: "All Calculation Methods",
        methodUSNavy: "U.S. Navy Method",
        methodBMI: "BMI-Based Method",
        methodRFM: "Relative Fat Mass (RFM)",
        methodYMCA: "YMCA Formula",
        methodCovertBailey: "Deurenberg Formula",
        methodJP3: "Jackson-Pollock 3-Site",
        methodEnhanced: "Enhanced Multi-Site",
        notAvailable: "Not available",
        requiresHip: "requires hip measurement",
        requiresChestThigh: "requires chest and thigh measurements",
        requiresAllAdvanced: "requires all advanced measurements (chest, bicep, forearm, thigh, calf)",
        reliabilityNote: "⭐ = Most reliable method (weighted 3x in average calculation)"
    },
    fr: {
        title: "Calculateur Précis de Graisse Corporelle",
        subtitle: "Calculez votre pourcentage de graisse corporelle avec la méthode de la Marine américaine",
        metricBtn: "Métrique (cm/kg)",
        imperialBtn: "Impérial (po/lb)",
        simpleMode: "Mode Simple",
        advancedMode: "Mode Avancé",
        male: "Homme",
        female: "Femme",
        weight: "Poids",
        height: "Taille",
        neck: "Cou",
        waist: "Taille",
        hip: "Hanches",
        chest: "Poitrine",
        bicep: "Biceps",
        forearm: "Avant-bras",
        thigh: "Cuisse",
        calf: "Mollet",
        additionalMeasurements: "Mesures Supplémentaires",
        calculateBtn: "Calculer la Graisse Corporelle",
        yourResults: "Vos Résultats",
        fatMass: "Masse Grasse :",
        leanMass: "Masse Maigre :",
        interpretation: "Interprétation",
        footer1: "Ce calculateur utilise la formule de graisse corporelle de la Marine américaine et des mesures supplémentaires pour une précision accrue.",
        footer2: "Les résultats sont des estimations et ne doivent pas remplacer les conseils médicaux professionnels.",
        howToMeasure: "Comment Mesurer",
        measureNeck: "Comment Mesurer le Cou",
        measureWaist: "Comment Mesurer la Taille",
        measureHip: "Comment Mesurer les Hanches",
        measureChest: "Comment Mesurer la Poitrine",
        measureBicep: "Comment Mesurer le Biceps",
        measureForearm: "Comment Mesurer l'Avant-bras",
        measureThigh: "Comment Mesurer la Cuisse",
        measureCalf: "Comment Mesurer le Mollet",
        categoryEssential: "Graisse Essentielle",
        categoryAthletic: "Athlétique",
        categoryFitness: "Bonne Forme",
        categoryAverage: "Moyenne",
        categoryAbove: "Au-dessus de la Moyenne",
        categoryObese: "Obèse",
        interpMaleEssential: "Ce niveau est en dessous de la graisse essentielle et peut présenter des risques pour la santé. La graisse essentielle est nécessaire au fonctionnement physiologique normal.",
        interpMaleAthletic: "Cette plage est typique des athlètes. Elle indique une excellente condition physique et un faible taux de graisse corporelle, courant chez les athlètes de compétition.",
        interpMaleFitness: "Il s'agit d'une plage saine qui indique de bons niveaux de condition physique. Vous maintenez un mode de vie actif avec de l'exercice régulier.",
        interpMaleAverage: "Cela se situe dans la moyenne pour les hommes. Bien que non malsain, il peut y avoir place à l'amélioration par l'alimentation et l'exercice.",
        interpMaleAbove: "C'est au-dessus de la moyenne. Envisagez de consulter un professionnel de la santé au sujet de stratégies saines de gestion du poids.",
        interpFemaleEssential: "Ce niveau est en dessous de la graisse essentielle et peut présenter des risques pour la santé. Les femmes ont besoin de niveaux de graisse essentielle plus élevés que les hommes pour un fonctionnement physiologique normal.",
        interpFemaleAthletic: "Cette plage est typique des athlètes féminines. Elle indique une excellente condition physique et un faible taux de graisse corporelle, courant chez les athlètes de compétition.",
        interpFemaleFitness: "Il s'agit d'une plage saine qui indique de bons niveaux de condition physique. Vous maintenez un mode de vie actif avec de l'exercice régulier.",
        interpFemaleAverage: "Cela se situe dans la moyenne pour les femmes. Bien que non malsain, il peut y avoir place à l'amélioration par l'alimentation et l'exercice.",
        interpFemaleAbove: "C'est au-dessus de la moyenne. Envisagez de consulter un professionnel de la santé au sujet de stratégies saines de gestion du poids.",
        methodsTitle: "Toutes les Méthodes de Calcul",
        methodUSNavy: "Méthode de la Marine Américaine",
        methodBMI: "Méthode Basée sur l'IMC",
        methodRFM: "Masse Grasse Relative (RFM)",
        methodYMCA: "Formule YMCA",
        methodCovertBailey: "Formule de Deurenberg",
        methodJP3: "Jackson-Pollock 3-Sites",
        methodEnhanced: "Multi-Sites Améliorée",
        notAvailable: "Non disponible",
        requiresHip: "nécessite la mesure des hanches",
        requiresChestThigh: "nécessite les mesures de poitrine et cuisse",
        requiresAllAdvanced: "nécessite toutes les mesures avancées (poitrine, biceps, avant-bras, cuisse, mollet)",
        reliabilityNote: "⭐ = Méthode la plus fiable (pondérée 3x dans le calcul de la moyenne)"
    }
};

const metricBtn = document.getElementById('metricBtn');
const imperialBtn = document.getElementById('imperialBtn');
const simpleBtn = document.getElementById('simpleBtn');
const advancedBtn = document.getElementById('advancedBtn');
const enBtn = document.getElementById('enBtn');
const frBtn = document.getElementById('frBtn');
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
enBtn.addEventListener('click', () => setLanguage('en'));
frBtn.addEventListener('click', () => setLanguage('fr'));

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
    let hip = gender === 'female' ? (parseFloat(document.getElementById('hip').value) || 0) : 0;

    let chest = parseFloat(document.getElementById('chest').value) || 0;
    let bicep = parseFloat(document.getElementById('bicep').value) || 0;
    let forearm = parseFloat(document.getElementById('forearm').value) || 0;
    let thigh = parseFloat(document.getElementById('thigh').value) || 0;
    let calf = parseFloat(document.getElementById('calf').value) || 0;

    if (!isMetric) {
        weight = weight * 0.453592;
        height = height * 2.54;
        neck = neck * 2.54;
        waist = waist * 2.54;
        hip = hip * 2.54;
        chest = chest * 2.54;
        bicep = bicep * 2.54;
        forearm = forearm * 2.54;
        thigh = thigh * 2.54;
        calf = calf * 2.54;
    }

    const bmi = weight / Math.pow(height / 100, 2);
    const results = {};

    results.usNavy = calculateUSNavy(gender, height, neck, waist, hip);

    results.bmiMethod = calculateBMIMethod(gender, bmi);

    results.rfm = calculateRFM(gender, height, waist);

    results.ymca = calculateYMCA(gender, weight, waist);

    results.covertBailey = calculateCovertBailey(gender, height, waist, hip, neck, bmi);

    if (chest && thigh) {
        results.jp3Site = calculateJP3Site(gender, chest, thigh, waist, hip);
    } else {
        results.jp3Site = null;
    }

    if (chest && bicep && forearm && thigh && calf) {
        results.enhanced = calculateEnhanced(gender, height, neck, waist, hip, chest, bicep, forearm, thigh, calf);
    } else {
        results.enhanced = null;
    }

    displayResults(results, bmi, gender, weight);
}

function calculateUSNavy(gender, height, neck, waist, hip) {
    if (gender === 'male') {
        return 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
    } else {
        if (!hip) return null;
        return 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
    }
}

function calculateBMIMethod(gender, bmi) {
    const age = 30;
    if (gender === 'male') {
        return (1.20 * bmi) + (0.23 * age) - 16.2;
    } else {
        return (1.20 * bmi) + (0.23 * age) - 5.4;
    }
}

function calculateRFM(gender, height, waist) {
    if (gender === 'male') {
        return 64 - (20 * (height / waist));
    } else {
        return 76 - (20 * (height / waist));
    }
}

function calculateYMCA(gender, weight, waist) {
    const waistInches = waist / 2.54;
    const weightLbs = weight * 2.20462;

    if (gender === 'male') {
        return ((4.15 * waistInches) - (0.082 * weightLbs) - 98.42) / weightLbs * 100;
    } else {
        return ((4.15 * waistInches) - (0.082 * weightLbs) - 76.76) / weightLbs * 100;
    }
}

function calculateCovertBailey(gender, height, waist, hip, neck, bmi) {
    const age = 30;
    if (gender === 'male') {
        return (1.20 * bmi) + (0.23 * age) - (10.8 * 1) - 5.4;
    } else {
        return (1.20 * bmi) + (0.23 * age) - (10.8 * 0) - 5.4;
    }
}

function calculateJP3Site(gender, chest, thigh, waist, hip) {
    if (gender === 'male') {
        const sumSkinfolds = chest + thigh + waist;
        const age = 30;
        const density = 1.10938 - (0.0008267 * sumSkinfolds) + (0.0000016 * Math.pow(sumSkinfolds, 2)) - (0.0002574 * age);
        return (495 / density) - 450;
    } else {
        if (!hip) return null;
        const sumSkinfolds = thigh + waist + hip;
        const age = 30;
        const density = 1.0994921 - (0.0009929 * sumSkinfolds) + (0.0000023 * Math.pow(sumSkinfolds, 2)) - (0.0001392 * age);
        return (495 / density) - 450;
    }
}

function calculateEnhanced(gender, height, neck, waist, hip, chest, bicep, forearm, thigh, calf) {
    let baseNavy = calculateUSNavy(gender, height, neck, waist, hip);
    if (!baseNavy) return null;

    const avgCircumference = (chest + bicep + forearm + thigh + calf) / 5;
    const circumferenceRatio = waist / avgCircumference;

    if (circumferenceRatio > 1.5) {
        baseNavy += 1.5;
    } else if (circumferenceRatio < 0.8) {
        baseNavy -= 1.0;
    }

    return baseNavy;
}

function displayResults(results, bmi, gender, weight) {
    const resultsDiv = document.getElementById('results');
    const bodyFatEl = document.getElementById('bodyFatPercentage');
    const categoryEl = document.getElementById('category');
    const fatMassEl = document.getElementById('fatMass');
    const leanMassEl = document.getElementById('leanMass');
    const bmiEl = document.getElementById('bmi');
    const interpretationEl = document.getElementById('interpretationText');

    const mostReliable = determineMostReliable(results);

    const availableResults = Object.entries(results).filter(([key, value]) => value !== null);

    let totalWeight = 0;
    let weightedSum = 0;

    availableResults.forEach(([key, value]) => {
        const weight = key === mostReliable ? 3.0 : 1.0;
        weightedSum += value * weight;
        totalWeight += weight;
    });

    const avgBodyFat = weightedSum / totalWeight;

    bodyFatEl.textContent = avgBodyFat.toFixed(1);

    const weightUnit = isMetric ? 'kg' : 'lb';
    const fatMass = weight * (avgBodyFat / 100);
    const leanMass = weight - fatMass;
    const displayFatMass = isMetric ? fatMass : fatMass * 2.20462;
    const displayLeanMass = isMetric ? leanMass : leanMass * 2.20462;

    fatMassEl.textContent = `${displayFatMass.toFixed(1)} ${weightUnit}`;
    leanMassEl.textContent = `${displayLeanMass.toFixed(1)} ${weightUnit}`;
    bmiEl.textContent = bmi.toFixed(1);

    const { category, interpretation } = getBodyFatCategory(avgBodyFat, gender);
    categoryEl.textContent = category;
    interpretationEl.textContent = interpretation;

    displayBodyFatScale(avgBodyFat, gender);
    displayMethodResults(results, gender, mostReliable);

    resultsDiv.style.display = 'block';
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function displayBodyFatScale(bodyFatPercentage, gender) {
    const marker = document.getElementById('bfMarker');
    const markerValue = document.getElementById('bfMarkerValue');
    const labelsContainer = document.getElementById('bfScaleLabels');
    const lang = currentLanguage;

    let ranges, maxValue;
    if (gender === 'male') {
        ranges = [
            { label: translations[lang].categoryEssential, end: 6 },
            { label: translations[lang].categoryAthletic, end: 14 },
            { label: translations[lang].categoryFitness, end: 18 },
            { label: translations[lang].categoryAverage, end: 25 },
            { label: translations[lang].categoryAbove, end: 32 },
            { label: translations[lang].categoryObese, end: 40 }
        ];
        maxValue = 40;
    } else {
        ranges = [
            { label: translations[lang].categoryEssential, end: 14 },
            { label: translations[lang].categoryAthletic, end: 21 },
            { label: translations[lang].categoryFitness, end: 25 },
            { label: translations[lang].categoryAverage, end: 32 },
            { label: translations[lang].categoryAbove, end: 38 },
            { label: translations[lang].categoryObese, end: 45 }
        ];
        maxValue = 45;
    }

    const cappedPercentage = Math.min(bodyFatPercentage, maxValue);
    const position = (cappedPercentage / maxValue) * 100;
    marker.style.left = `${position}%`;
    markerValue.textContent = `${bodyFatPercentage.toFixed(1)}%`;

    labelsContainer.innerHTML = '';
    ranges.forEach(range => {
        const label = document.createElement('div');
        label.className = 'bf-scale-label';
        label.textContent = range.label;
        labelsContainer.appendChild(label);
    });
}

function determineMostReliable(results) {
    let mostReliable;
    if (results.enhanced !== null && results.enhanced !== undefined) {
        mostReliable = 'enhanced';
    } else if (results.jp3Site !== null && results.jp3Site !== undefined) {
        mostReliable = 'jp3Site';
    } else {
        mostReliable = 'usNavy';
    }
    console.log('Most reliable method:', mostReliable, 'Results:', results);
    return mostReliable;
}

function displayMethodResults(results, gender, mostReliable) {
    const lang = currentLanguage;
    let html = '<div class="methods-results"><h3>' + translations[lang].methodsTitle + '</h3>';
    html += '<p class="reliability-note">' + translations[lang].reliabilityNote + '</p>';

    const methodNames = {
        usNavy: translations[lang].methodUSNavy,
        bmiMethod: translations[lang].methodBMI,
        rfm: translations[lang].methodRFM,
        ymca: translations[lang].methodYMCA,
        covertBailey: translations[lang].methodCovertBailey,
        jp3Site: translations[lang].methodJP3,
        enhanced: translations[lang].methodEnhanced
    };

    const requiredMeasurements = {
        usNavy: gender === 'male' ? '' : translations[lang].requiresHip,
        bmiMethod: '',
        rfm: '',
        ymca: '',
        covertBailey: gender === 'male' ? '' : translations[lang].requiresHip,
        jp3Site: translations[lang].requiresChestThigh,
        enhanced: translations[lang].requiresAllAdvanced
    };

    const methodOrder = ['enhanced', 'jp3Site', 'usNavy', 'ymca', 'rfm', 'bmiMethod', 'covertBailey'];

    methodOrder.forEach(key => {
        if (results[key] === undefined) return;

        const value = results[key];
        const methodName = methodNames[key];
        const isMostReliable = key === mostReliable;
        console.log('Method:', key, 'isMostReliable:', isMostReliable, 'mostReliable:', mostReliable);

        html += `<div class="method-result ${isMostReliable ? 'most-reliable' : ''}">`;
        html += `<span class="method-name">${methodName}${isMostReliable ? ' ⭐' : ''}:</span> `;

        if (value !== null) {
            html += `<span class="method-value">${value.toFixed(1)}%</span>`;
        } else {
            html += `<span class="method-unavailable">${translations[lang].notAvailable} - ${requiredMeasurements[key]}</span>`;
        }

        html += '</div>';
    });

    html += '</div>';

    const interpretationDiv = document.querySelector('.interpretation');
    const existingMethods = document.querySelector('.methods-results');
    if (existingMethods) {
        existingMethods.remove();
    }
    interpretationDiv.insertAdjacentHTML('afterend', html);
}

function getBodyFatCategory(percentage, gender) {
    let categoryKey, interpretationKey;
    const lang = currentLanguage;

    if (gender === 'male') {
        if (percentage < 6) {
            categoryKey = 'categoryEssential';
            interpretationKey = 'interpMaleEssential';
        } else if (percentage < 14) {
            categoryKey = 'categoryAthletic';
            interpretationKey = 'interpMaleAthletic';
        } else if (percentage < 18) {
            categoryKey = 'categoryFitness';
            interpretationKey = 'interpMaleFitness';
        } else if (percentage < 25) {
            categoryKey = 'categoryAverage';
            interpretationKey = 'interpMaleAverage';
        } else {
            categoryKey = 'categoryAbove';
            interpretationKey = 'interpMaleAbove';
        }
    } else {
        if (percentage < 14) {
            categoryKey = 'categoryEssential';
            interpretationKey = 'interpFemaleEssential';
        } else if (percentage < 21) {
            categoryKey = 'categoryAthletic';
            interpretationKey = 'interpFemaleAthletic';
        } else if (percentage < 25) {
            categoryKey = 'categoryFitness';
            interpretationKey = 'interpFemaleFitness';
        } else if (percentage < 32) {
            categoryKey = 'categoryAverage';
            interpretationKey = 'interpFemaleAverage';
        } else {
            categoryKey = 'categoryAbove';
            interpretationKey = 'interpFemaleAbove';
        }
    }

    return {
        category: translations[lang][categoryKey],
        interpretation: translations[lang][interpretationKey]
    };
}

function showMeasurementGuide(measurement) {
    const guideTitle = document.getElementById('guideTitle');
    const guideContent = document.getElementById('guideContent');
    const lang = currentLanguage;

    const measureKey = 'measure' + measurement.charAt(0).toUpperCase() + measurement.slice(1);
    guideTitle.textContent = translations[lang][measureKey];

    const guides = {
        neck: {
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
    guideContent.innerHTML = guide.content;
    modal.style.display = 'flex';
}

function setLanguage(lang) {
    currentLanguage = lang;
    enBtn.classList.toggle('active', lang === 'en');
    frBtn.classList.toggle('active', lang === 'fr');

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    document.getElementById('guideTitle').textContent = translations[lang].howToMeasure;

    const resultsDiv = document.getElementById('results');
    if (resultsDiv.style.display !== 'none') {
        const bodyFatPercentage = parseFloat(document.getElementById('bodyFatPercentage').textContent);
        const gender = document.querySelector('input[name="gender"]:checked').value;
        displayBodyFatScale(bodyFatPercentage, gender);

        const { category, interpretation } = getBodyFatCategory(bodyFatPercentage, gender);
        document.getElementById('category').textContent = category;
        document.getElementById('interpretationText').textContent = interpretation;
    }

    saveData();
}

function saveData() {
    const data = {
        isMetric: isMetric,
        isAdvanced: isAdvanced,
        language: currentLanguage,
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

        if (data.language) {
            setLanguage(data.language);
        }

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