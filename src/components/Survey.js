import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  TextField,
  Checkbox,
  FormGroup,
  Select,
  MenuItem,
} from '@mui/material';
import axios from 'axios';
import { useTheme, useMediaQuery } from '@mui/material';
import styled from '@emotion/styled';

const sections = ['Informations', 'Connaissances', 'Attitudes', 'Pratiques'];

const wilayas = [
  "Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Batna", "Béjaïa", "Biskra",
  "Béchar", "Blida", "Bouira", "Tamanrasset", "Tébessa", "Tlemcen", "Tiaret",
  "Tizi Ouzou", "Alger", "Djelfa", "Jijel", "Sétif", "Saïda", "Skikda",
  "Sidi Bel Abbès", "Annaba", "Guelma", "Constantine", "Médéa", "Mostaganem",
  "M'Sila", "Mascara", "Ouargla", "Oran", "El Bayadh", "Illizi", "Bordj Bou Arréridj",
  "Boumerdès", "El Tarf", "Tindouf", "Tissemsilt", "El Oued", "Khenchela",
  "Souk Ahras", "Tipaza", "Mila", "Aïn Defla", "Naâma", "Aïn Témouchent",
  "Ghardaïa", "Relizane", "Timimoun", "Bordj Badji Mokhtar", "Ouled Djellal",
  "Béni Abbès", "In Salah", "In Guezzam", "Touggourt", "Djanet", "El M'Ghair",
  "El Meniaa"
];

const questions = {
  fr: {
    section1: {
      title: "Informations sociodémographiques",
      questions: {
        age: {
          label: "S1. Âge",
          options: [
            "18-25 ans",
            "26-35 ans",
            "36-45 ans",
            "46-55 ans",
            "56-65 ans",
            "Plus de 65 ans"
          ]
        },
        gender: {
          label: "S2. Sexe",
          options: [
            "Homme",
            "Femme",
            "Autre",
            "Préfère ne pas répondre"
          ]
        },
        education: {
          label: "S3. Niveau d'études",
          options: [
            "Aucun",
            "Primaire",
            "Moyen",
            "Secondaire",
            "Universitaire",
            "Post-graduation",
            "Autre"
          ]
        },
        profession: {
          label: "S4. Situation professionnelle",
          options: [
            "Étudiant(e)",
            "Employé(e)",
            "Fonctionnaire",
            "Profession libérale",
            "Sans emploi",
            "Retraité(e)",
            "Autre"
          ]
        },
        wilaya: {
          label: "S5. Wilaya de résidence",
          options: wilayas
        },
        medicalHistory: {
          label: "S6. Antécédents médicaux importants",
          options: [
            "Non, aucun",
            "Oui"
          ]
        }
      }
    },
    section2: {
      title: "Connaissances sur le don de sang",
      questions: {
        K1: "Le don de sang est sans danger pour le donneur",
        K2: "Une personne peut donner son sang tous les 3 mois",
        K3: "Le sang donné est testé pour les maladies transmissibles",
        K4: "Le don de sang est rémunéré",
        K5: "Le don de sang peut sauver jusqu'à trois vies",
        K6: "Le sang peut être conservé indéfiniment",
        K7: "Seules les personnes du groupe O peuvent donner leur sang",
        K8: "Le don de sang peut être fait pendant le jeûne"
      },
      options: ["Vrai", "Faux", "Je ne sais pas"]
    },
    section3: {
      title: "Attitudes envers le don de sang",
      questions: {
        A1: "Le don de sang est un acte important pour la société",
        A2: "Je me sens concerné(e) par le don de sang",
        A3: "Le don de sang est compatible avec mes croyances religieuses",
        A4: "J'ai confiance dans le système de collecte de sang",
        A5: "Le don de sang est sûr pour le donneur",
        A6: "Les centres de don de sang sont facilement accessibles",
        A7: "Les informations sur le don de sang sont facilement disponibles"
      },
      options: [
        "Tout à fait d'accord",
        "Plutôt d'accord",
        "Ni d'accord ni pas d'accord",
        "Plutôt pas d'accord",
        "Pas du tout d'accord"
      ]
    },
    section4: {
      title: "Pratiques liées au don de sang",
      questions: {
        previousDonation: {
          label: "B1. Expérience de don",
          options: ["Oui", "Non"]
        },
        donationFrequency: {
          label: "B2. Fréquence de don",
          options: [
            "1 fois",
            "2-5 fois",
            "6-10 fois",
            "Plus de 10 fois",
            "Ne s'applique pas"
          ]
        },
        nonDonationReasons: {
          label: "B3. Raisons de non-don (choix multiples)",
          options: [
            "Je n'y ai jamais pensé",
            "Je manque d'information",
            "J'ai peur (aiguilles, douleur)",
            "Je n'ai pas eu l'occasion",
            "Raisons de santé",
            "Contre-indication médicale",
            "Manque de temps",
            "Centre de don trop éloigné",
            "Autre"
          ]
        },
        futureIntention: {
          label: "B4. Intention future",
          options: ["Oui", "Non", "Incertain"]
        },
        encourageOthers: {
          label: "B5. Encouragement d'autres personnes",
          options: ["Oui", "Non"]
        }
      }
    }
  },
  ar: {
    section1: {
      title: "المعلومات الاجتماعية والديموغرافية",
      questions: {
        age: {
          label: "س1. العمر",
          options: [
            "18-25 سنة",
            "26-35 سنة",
            "36-45 سنة",
            "46-55 سنة",
            "56-65 سنة",
            "أكثر من 65 سنة"
          ]
        },
        gender: {
          label: "س2. الجنس",
          options: [
            "ذكر",
            "أنثى",
            "آخر",
            "أفضل عدم الإجابة"
          ]
        },
        education: {
          label: "س3. المستوى التعليمي",
          options: [
            "بدون تعليم",
            "ابتدائي",
            "متوسط",
            "ثانوي",
            "جامعي",
            "دراسات عليا",
            "آخر"
          ]
        },
        profession: {
          label: "س4. الوضع المهني",
          options: [
            "طالب(ة)",
            "موظف(ة)",
            "موظف(ة) حكومي",
            "مهنة حرة",
            "بدون عمل",
            "متقاعد(ة)",
            "آخر"
          ]
        },
        wilaya: {
          label: "س5. ولاية الإقامة",
          options: wilayas
        },
        medicalHistory: {
          label: "س6. سوابق طبية مهمة",
          options: [
            "لا، لا يوجد",
            "نعم"
          ]
        }
      }
    },
    section2: {
      title: "المعرفة حول التبرع بالدم",
      questions: {
        K1: "التبرع بالدم آمن للمتبرع",
        K2: "يمكن للشخص التبرع بالدم كل 3 أشهر",
        K3: "يتم فحص الدم المتبرع به للأمراض المعدية",
        K4: "التبرع بالدم مدفوع الأجر",
        K5: "التبرع بالدم يمكن أن ينقذ حتى ثلاثة أرواح",
        K6: "يمكن حفظ الدم إلى أجل غير مسمى",
        K7: "فقط الأشخاص من فصيلة O يمكنهم التبرع بالدم",
        K8: "يمكن التبرع بالدم أثناء الصيام"
      },
      options: ["صحيح", "خطأ", "لا أعرف"]
    },
    section3: {
      title: "المواقف تجاه التبرع بالدم",
      questions: {
        A1: "التبرع بالدم عمل مهم للمجتمع",
        A2: "أشعر بأنني معني بالتبرع بالدم",
        A3: "التبرع بالدم يتوافق مع معتقداتي الدينية",
        A4: "لدي ثقة في نظام جمع الدم",
        A5: "التبرع بالدم آمن للمتبرع",
        A6: "مراكز التبرع بالدم يسهل الوصول إليها",
        A7: "المعلومات حول التبرع بالدم متوفرة بسهولة"
      },
      options: [
        "موافق تماماً",
        "موافق نوعاً ما",
        "لا موافق ولا غير موافق",
        "غير موافق نوعاً ما",
        "غير موافق تماماً"
      ]
    },
    section4: {
      title: "ممارسات التبرع بالدم",
      questions: {
        previousDonation: {
          label: "ب1. تجربة التبرع",
          options: ["نعم", "لا"]
        },
        donationFrequency: {
          label: "ب2. عدد مرات التبرع",
          options: [
            "مرة واحدة",
            "2-5 مرات",
            "6-10 مرات",
            "أكثر من 10 مرات",
            "لا ينطبق"
          ]
        },
        nonDonationReasons: {
          label: "ب3. أسباب عدم التبرع (اختيارات متعددة)",
          options: [
            "لم أفكر في ذلك من قبل",
            "نقص المعلومات",
            "الخوف (من الإبر، الألم)",
            "لم تتح لي الفرصة",
            "أسباب صحية",
            "موانع طبية",
            "نقص الوقت",
            "مركز التبرع بعيد",
            "سبب آخر"
          ]
        },
        futureIntention: {
          label: "ب4. النية المستقبلية",
          options: ["نعم", "لا", "غير متأكد"]
        },
        encourageOthers: {
          label: "ب5. تشجيع الآخرين",
          options: ["نعم", "لا"]
        }
      }
    }
  }
};

const API_URL = process.env.REACT_APP_API_URL;

function Survey() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [language, setLanguage] = useState('fr');
  const [formData, setFormData] = useState({
    // Section 1
    age: '',
    gender: '',
    education: '',
    profession: '',
    wilaya: '',
    medicalHistory: '',
    medicalHistoryDetails: '',
    
    // Section 2
    K1: '',
    K2: '',
    K3: '',
    K4: '',
    K5: '',
    K6: '',
    K7: '',
    K8: '',
    
    // Section 3
    A1: '',
    A2: '',
    A3: '',
    A4: '',
    A5: '',
    A6: '',
    A7: '',
    
    // Section 4
    previousDonation: '',
    donationFrequency: '',
    nonDonationReasons: [],
    nonDonationOther: '',
    futureIntention: '',
    encourageOthers: ''
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleNext = () => {
    if (activeStep === sections.length - 1) {
      const requiredFields = {
        section1: ['age', 'gender', 'education', 'profession', 'wilaya', 'medicalHistory'],
        section2: ['K1', 'K2', 'K3', 'K4', 'K5', 'K6', 'K7', 'K8'],
        section3: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7'],
        section4: ['previousDonation', 'futureIntention', 'encourageOthers']
      };

      const currentSectionFields = requiredFields[`section${activeStep + 1}`];
      const emptyFields = currentSectionFields.filter(field => !formData[field]);

      if (emptyFields.length > 0) {
        alert('Veuillez remplir tous les champs obligatoires avant de continuer.');
        return;
      }
      handleSubmit();
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    
    if (type === 'checkbox') {
      if (checked) {
        setFormData(prev => ({
          ...prev,
          [name]: Array.isArray(prev[name]) ? [...prev[name], value] : [value]
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: Array.isArray(prev[name]) 
            ? prev[name].filter(item => item !== value)
            : prev[name]
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const checkEmailExists = async (email) => {
    try {
      const response = await axios.post(`${API_URL}/responses/check-email`, { email });
      return response.data.exists;
    } catch (err) {
      return false;
    }
  };

  const handleSubmit = async () => {
    const emailInput = document.querySelector('input[type="email"]');
    const email = emailInput?.value?.trim();

    if (!email) {
      alert('Veuillez entrer votre email');
      return;
    }

    // Check if email exists
    const exists = await checkEmailExists(email);
    if (exists) {
      alert('Cet email a déjà été utilisé pour répondre au questionnaire');
      return;
    }

    try {
      await axios.post(`${API_URL}/responses`, {
        ...formData,
        email,
        language
      });
      navigate('/thank-you');
    } catch (error) {
      alert(`Erreur lors de la soumission du formulaire: ${error.response?.data?.message || error.message}`);
    }
  };

  // Style personnalisé pour le Stepper responsive
  const StyledStepper = styled(Stepper)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
      '& .MuiStepLabel-label': {
        fontSize: '0.75rem',
      },
      '& .MuiStepIcon-root': {
        fontSize: '1.2rem',
      },
    },
  }));

  // Style personnalisé pour le Paper container
  const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(4),
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(5),
    },
  }));

  const renderStepContent = (step) => {
    const sectionQuestions = questions[language][`section${step + 1}`];

    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              {sectionQuestions.title}
            </Typography>
            
            <FormControl fullWidth margin="normal">
              <FormLabel>{sectionQuestions.questions.age.label}</FormLabel>
              <RadioGroup
                name="age"
                value={formData.age}
                onChange={handleChange}
              >
                {sectionQuestions.questions.age.options.map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio />}
                    label={option}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <FormLabel>{sectionQuestions.questions.gender.label}</FormLabel>
              <RadioGroup
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                {sectionQuestions.questions.gender.options.map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio />}
                    label={option}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <FormLabel>{sectionQuestions.questions.education.label}</FormLabel>
              <Select
                name="education"
                value={formData.education}
                onChange={handleChange}
              >
                {sectionQuestions.questions.education.options.map((option) => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <FormLabel>{sectionQuestions.questions.profession.label}</FormLabel>
              <Select
                name="profession"
                value={formData.profession}
                onChange={handleChange}
              >
                {sectionQuestions.questions.profession.options.map((option) => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <FormLabel>{sectionQuestions.questions.wilaya.label}</FormLabel>
              <Select
                name="wilaya"
                value={formData.wilaya}
                onChange={handleChange}
              >
                {sectionQuestions.questions.wilaya.options.map((option) => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <FormLabel>{sectionQuestions.questions.medicalHistory.label}</FormLabel>
              <RadioGroup
                name="medicalHistory"
                value={formData.medicalHistory}
                onChange={handleChange}
              >
                {sectionQuestions.questions.medicalHistory.options.map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio />}
                    label={option}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            {formData.medicalHistory === "Oui" && (
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Précisez vos antécédents médicaux"
                name="medicalHistoryDetails"
                value={formData.medicalHistoryDetails}
                onChange={handleChange}
                margin="normal"
              />
            )}
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              {sectionQuestions.title}
            </Typography>
            
            {Object.entries(sectionQuestions.questions).map(([key, question]) => (
              <FormControl key={key} fullWidth margin="normal">
                <FormLabel>{question}</FormLabel>
                <RadioGroup
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                >
                  {sectionQuestions.options.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio />}
                      label={option}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            ))}
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              {sectionQuestions.title}
            </Typography>
            
            {Object.entries(sectionQuestions.questions).map(([key, question]) => (
              <FormControl key={key} fullWidth margin="normal">
                <FormLabel>{question}</FormLabel>
                <RadioGroup
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                >
                  {sectionQuestions.options.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio />}
                      label={option}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            ))}
          </Box>
        );

      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              {sectionQuestions.title}
            </Typography>
            
            <FormControl fullWidth margin="normal">
              <FormLabel>{sectionQuestions.questions.previousDonation.label}</FormLabel>
              <RadioGroup
                name="previousDonation"
                value={formData.previousDonation}
                onChange={handleChange}
              >
                {sectionQuestions.questions.previousDonation.options.map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio />}
                    label={option}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            {formData.previousDonation === "Oui" && (
              <FormControl fullWidth margin="normal">
                <FormLabel>{sectionQuestions.questions.donationFrequency.label}</FormLabel>
                <RadioGroup
                  name="donationFrequency"
                  value={formData.donationFrequency}
                  onChange={handleChange}
                >
                  {sectionQuestions.questions.donationFrequency.options.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio />}
                      label={option}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            )}

            {formData.previousDonation === "Non" && (
              <FormControl fullWidth margin="normal">
                <FormLabel>{sectionQuestions.questions.nonDonationReasons.label}</FormLabel>
                <FormGroup>
                  {sectionQuestions.questions.nonDonationReasons.options.map((option) => (
                    <FormControlLabel
                      key={option}
                      control={
                        <Checkbox
                          checked={formData.nonDonationReasons.includes(option)}
                          onChange={handleChange}
                          name="nonDonationReasons"
                          value={option}
                        />
                      }
                      label={option}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            )}

            {formData.nonDonationReasons?.includes("Autre") && (
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Précisez la raison"
                name="nonDonationOther"
                value={formData.nonDonationOther}
                onChange={handleChange}
                margin="normal"
              />
            )}

            <FormControl fullWidth margin="normal">
              <FormLabel>{sectionQuestions.questions.futureIntention.label}</FormLabel>
              <RadioGroup
                name="futureIntention"
                value={formData.futureIntention}
                onChange={handleChange}
              >
                {sectionQuestions.questions.futureIntention.options.map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio />}
                    label={option}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <FormLabel>{sectionQuestions.questions.encourageOthers.label}</FormLabel>
              <RadioGroup
                name="encourageOthers"
                value={formData.encourageOthers}
                onChange={handleChange}
              >
                {sectionQuestions.questions.encourageOthers.options.map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio />}
                    label={option}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <Box sx={{ mt: 4, mb: 2 }}>
              <Typography variant="subtitle1" gutterBottom sx={{ color: 'text.secondary' }}>
                Email pour validation
              </Typography>
              <input
                type="email"
                placeholder="Entrez un email se terminant par @example.com"
                pattern=".+@example\.com$"
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '16px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  marginTop: '8px'
                }}
                title="L'email doit se terminer par @example.com"
              />
            </Box>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md" sx={{ 
      py: { xs: 2, sm: 3, md: 4 },
      px: { xs: 1, sm: 2, md: 3 }
    }}>
      <StyledPaper elevation={3}>
        <Box sx={{ mb: { xs: 2, sm: 3, md: 4 } }}>
          <FormControl>
            <FormLabel>Langue / اللغة</FormLabel>
            <RadioGroup
              row
              name="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <FormControlLabel value="fr" control={<Radio />} label="Français" />
              <FormControlLabel value="ar" control={<Radio />} label="العربية" />
            </RadioGroup>
          </FormControl>
        </Box>

        <StyledStepper 
          activeStep={activeStep} 
          sx={{ mb: { xs: 2, sm: 3, md: 4 } }}
          orientation={isMobile ? 'vertical' : 'horizontal'}
          alternativeLabel={!isMobile}
        >
          {sections.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </StyledStepper>

        <Box sx={{ 
          '& .MuiFormControl-root': { 
            mb: { xs: 1.5, sm: 2, md: 2.5 } 
          }
        }}>
          {renderStepContent(activeStep)}
        </Box>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          mt: { xs: 2, sm: 3, md: 4 },
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 2 : 0
        }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            fullWidth={isMobile}
            variant={isMobile ? "outlined" : "text"}
          >
            Retour
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            fullWidth={isMobile}
          >
            {activeStep === sections.length - 1 ? 'Soumettre' : 'Suivant'}
          </Button>
        </Box>
      </StyledPaper>
    </Container>
  );
}

export default Survey; 