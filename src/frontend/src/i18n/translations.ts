/**
 * Bilingual copy for the Robi Care site.
 *
 * English is the source of truth: every translatable string is keyed by its
 * exact English text, so the English render is byte-identical to the original
 * site and any string without a French entry falls back to English. Protected
 * product terms (Robi Care, Keyboard Liberation, TMU-KL, SSOT-AI-GOV, SAAAS,
 * TMU Enablement Platform, PWA, KYC, AML, EMR) are deliberately absent from the
 * French table so they always render exactly as written in both languages.
 *
 * French is standard France French with a professional healthcare tone.
 */

export type Language = "en" | "fr";

export const DEFAULT_LANGUAGE: Language = "en";

/** localStorage key holding the visitor's language preference. */
export const LANGUAGE_STORAGE_KEY = "robi-care-language";

export type LanguageOption = {
  code: Language;
  /** Full name, used for accessible labels. */
  label: string;
  /** Two-letter code shown in the header toggle. */
  shortLabel: string;
};

export const LANGUAGES: LanguageOption[] = [
  { code: "en", label: "English", shortLabel: "EN" },
  { code: "fr", label: "Français", shortLabel: "FR" },
];

/** Document title per language, kept in step with the static index.html title. */
export const PAGE_TITLE: Record<Language, string> = {
  en: "Robi Care — Clinical Documentation & Communication Platform",
  fr: "Robi Care — Plateforme de documentation et de communication cliniques",
};

/**
 * French translations keyed by the exact English source string. A missing key
 * falls back to the English text, which is how protected terms stay in English.
 */
const FRENCH: Record<string, string> = {
  // Header
  "AI-assisted · Clinician-controlled · Designed for sovereign deployment":
    "Assisté par IA · Contrôlé par le clinicien · Conçu pour un déploiement souverain",
  "Account demo": "Démo du compte",
  "Sign Up": "S'inscrire",
  "Open navigation menu": "Ouvrir le menu de navigation",
  "Close navigation menu": "Fermer le menu de navigation",
  Primary: "Principale",
  Mobile: "Mobile",
  Language: "Langue",
  "Robi Care home": "Accueil Robi Care",

  // Primary navigation
  Solutions: "Solutions",
  "AI Governance": "Gouvernance de l'IA",
  "Sovereign AI": "IA souveraine",
  Pricing: "Tarifs",

  // Footer
  "Governed clinical enablement for more human care.":
    "Une assistance clinique gouvernée pour des soins plus humains.",
  "A service provision of Ecocarrier Inc., Ontario, Canada.":
    "Un service fourni par Ecocarrier Inc., Ontario, Canada.",
  "© 2026 Ecocarrier Inc. All rights reserved.":
    "© 2026 Ecocarrier Inc. Tous droits réservés.",
  "Not an emergency service. In an emergency, contact the applicable local emergency service.":
    "Service non destiné aux urgences. En cas d'urgence, contactez le service d'urgence local compétent.",
  Explore: "Explorer",
  Deploy: "Déployer",
  "Contact & policies": "Contact et politiques",
  "Clinical solutions": "Solutions cliniques",
  "AI governance": "Gouvernance de l'IA",
  Sponsorship: "Parrainage",
  "PPP partnerships": "Partenariats PPP",
  Onboarding: "Intégration",
  "Account demonstration": "Démonstration du compte",
  Contact: "Contact",
  Privacy: "Confidentialité",
  "Terms of Use": "Conditions d'utilisation",
  "Clinical disclaimer": "Avertissement clinique",

  // Shared calls to action
  "Get started": "Commencer",
  "Get Started": "Commencer",
  "Sign In": "Se connecter",
  "Contact us": "Nous contacter",
  "Talk to the team": "Parler à l'équipe",
  "Become a Sponsor": "Devenir parrain",
  "View pricing": "Voir les tarifs",
  "Deployment model": "Modèle de déploiement",
  "Contact for partnership": "Contacter pour un partenariat",
  "Send enquiry": "Envoyer la demande",
  "Send another enquiry": "Envoyer une autre demande",
  Continue: "Continuer",
  Verify: "Vérifier",
  "Back to details": "Retour aux informations",
  "Start over": "Recommencer",
  "Return home": "Retour à l'accueil",

  // Home — hero
  "GOVERNED CLINICAL AI": "IA CLINIQUE GOUVERNÉE",
  "More presence. Less paperwork.": "Plus de présence. Moins de paperasse.",
  "Robi Care helps healthcare professionals capture, structure and review clinical information—while keeping qualified clinicians in control of patient-care decisions.":
    "Robi Care aide les professionnels de santé à recueillir, structurer et vérifier les informations cliniques, tout en laissant les cliniciens qualifiés maîtres des décisions de soins aux patients.",
  "Explore clinical solutions": "Découvrir les solutions cliniques",

  // Home — audience section
  "Who we support": "Qui nous accompagnons",
  "Built for the teams who carry the clinical load":
    "Conçu pour les équipes qui portent la charge clinique",
  "Robi Care adapts to the documentation reality of each care setting, from the consultation room to the field.":
    "Robi Care s'adapte à la réalité documentaire de chaque environnement de soins, du cabinet de consultation au terrain.",
  "Physicians and Medical Personnel": "Médecins et personnel médical",
  "Spend less time on documentation, more time with patients.":
    "Passez moins de temps sur la documentation, plus de temps auprès des patients.",
  "Nursing Teams": "Équipes soignantes",
  "Capture structured observations, handovers and workflow information.":
    "Recueillez des observations structurées, des transmissions et des informations de flux de travail.",
  "Emergency Departments": "Services d'urgence",
  "Support rapid documentation, multilingual intake and accountable escalation.":
    "Facilitez une documentation rapide, l'accueil multilingue et une escalade traçable.",
  "EMS Organizations": "Organisations de services médicaux d'urgence",
  "Capture field information and prepare structured handover records.":
    "Recueillez les informations de terrain et préparez des dossiers de transmission structurés.",
  "Clinics and Hospital Administrators":
    "Directions de cliniques et d'hôpitaux",
  "Improve workflow consistency, visibility, governance and cost accountability.":
    "Améliorez la cohérence des flux de travail, la visibilité, la gouvernance et la responsabilité des coûts.",
  "AI-assisted, clinician-controlled. Robi Care prepares information for professional review; it does not replace clinical judgment.":
    "Assisté par IA, contrôlé par le clinicien. Robi Care prépare l'information pour un examen professionnel ; il ne remplace pas le jugement clinique.",

  // Home — how it works
  "From consultation to clear documentation in three steps":
    "De la consultation à une documentation claire en trois étapes",
  "Robi Care supports the clinical encounter end to end, while every decision stays with the clinician.":
    "Robi Care accompagne la rencontre clinique de bout en bout, chaque décision restant entre les mains du clinicien.",
  "Capture the conversation": "Recueillir la conversation",
  "Robi Care listens alongside the clinician during a consultation, turning spoken dialogue into a clean, timestamped transcript without interrupting the visit.":
    "Robi Care écoute aux côtés du clinicien pendant la consultation et transforme le dialogue parlé en une transcription horodatée et claire, sans interrompre la visite.",
  "Prepare structured documentation": "Préparer une documentation structurée",
  "The transcript is organised into the clinical note structure your team already uses — history, findings, assessment, and plan — ready for review in seconds.":
    "La transcription est organisée selon la structure de note clinique que votre équipe utilise déjà — antécédents, observations, évaluation et plan — prête à être vérifiée en quelques secondes.",
  "Coordinate follow-up": "Coordonner le suivi",
  "Referrals, recalls, and next appointments are surfaced as clear actions so nothing falls through the gaps between visits.":
    "Les orientations, les rappels et les prochains rendez-vous apparaissent sous forme d'actions claires, afin que rien ne se perde entre les visites.",

  // Home — clinician control
  "Clinician in control": "Le clinicien aux commandes",
  "The clinician reviews and approves every output":
    "Le clinicien vérifie et approuve chaque résultat",
  "Robi Care is an assistant, not an author. It prepares the work, and the clinician decides what becomes part of the record.":
    "Robi Care est un assistant, non un auteur. Il prépare le travail, et le clinicien décide de ce qui intègre le dossier.",
  "Every generated note is a draft until a clinician reviews and approves it.":
    "Chaque note générée reste un brouillon tant qu'un clinicien ne l'a pas vérifiée et approuvée.",
  "Nothing is written to the patient record without an explicit human action.":
    "Rien n'est écrit dans le dossier du patient sans une action humaine explicite.",
  "Suggested content is always traceable back to the source conversation.":
    "Le contenu suggéré est toujours traçable jusqu'à la conversation source.",
  "Clinicians can edit, reject, or rewrite any part of the output.":
    "Les cliniciens peuvent modifier, rejeter ou réécrire toute partie du résultat.",
  "Draft notes are presented for review — the clinician approves, edits, or discards each one before it is used.":
    "Les notes en brouillon sont présentées pour vérification — le clinicien approuve, modifie ou écarte chacune d'elles avant son utilisation.",

  // Home — platform provenance
  "Platform provenance": "Provenance de la plateforme",
  "Built on the TMU Enablement Platform":
    "Construit sur la TMU Enablement Platform",
  "Robi Care is a clinical application of the TMU · TeleMeetUp Enablement Platform — the same engine behind Morshid.":
    "Robi Care est une application clinique de la TMU · TeleMeetUp Enablement Platform — le même moteur que celui de Morshid.",
  "Shared enablement engine": "Moteur d'assistance partagé",
  "Robi Care runs on the same TMU Enablement Platform that powers Morshid, so capabilities, integrations, and governance are maintained in one place.":
    "Robi Care s'exécute sur la même TMU Enablement Platform que celle qui alimente Morshid, de sorte que les capacités, les intégrations et la gouvernance sont maintenues en un seul endroit.",
  "Consistent governance": "Gouvernance cohérente",
  "Access control, audit trails, and data handling follow the platform's established policies rather than a one-off clinical tool.":
    "Le contrôle d'accès, les pistes d'audit et le traitement des données suivent les politiques établies de la plateforme plutôt que celles d'un outil clinique isolé.",
  "Built for clinical workflows": "Conçu pour les flux de travail cliniques",
  "The platform layer handles capture, structuring, and coordination so clinical teams can focus on the patient in front of them.":
    "La couche plateforme prend en charge la saisie, la structuration et la coordination, afin que les équipes cliniques puissent se concentrer sur le patient qui leur fait face.",
  "Powered by TMU · TeleMeetUp Enablement Platform.":
    "Propulsé par TMU · TeleMeetUp Enablement Platform.",

  // Home — closing call to action
  "Bring calm documentation to your clinic":
    "Apportez une documentation sereine à votre clinique",
  "Start with Robi Care on the TMU · TeleMeetUp Enablement Platform, or talk to us about how it fits your clinical workflow.":
    "Commencez avec Robi Care sur la TMU · TeleMeetUp Enablement Platform, ou parlez-nous de son intégration à votre flux de travail clinique.",

  // Solutions page — hero and section headings
  "Clinical use cases, handled with care":
    "Des cas d'usage cliniques, traités avec soin",
  "Robi Care supports three parts of the clinical encounter: capturing the conversation, preparing structured documentation, and coordinating what happens next.":
    "Robi Care accompagne trois étapes de la consultation clinique : la capture de la conversation, la préparation d'une documentation structurée et la coordination de la suite.",
  "Each solution is designed to sit inside existing clinical workflows, not replace them.":
    "Chaque solution est conçue pour s'intégrer aux flux de travail cliniques existants, sans les remplacer.",
  "Use cases": "Cas d'usage",
  "Where Robi Care helps most": "Là où Robi Care apporte le plus",
  "Three connected capabilities that reduce documentation load while keeping clinical judgement with the clinician.":
    "Trois capacités connectées qui allègent la charge de documentation tout en laissant le jugement clinique au clinicien.",
  "Workflow fit": "Adéquation au flux de travail",
  "It fits the workflow you already have":
    "Il s'intègre au flux de travail que vous utilisez déjà",
  "Robi Care does not ask your team to change how they practise. It removes the documentation burden around the consultation and leaves clinical judgement exactly where it belongs.":
    "Robi Care ne demande pas à votre équipe de changer sa pratique. Il allège la charge de documentation autour de la consultation et laisse le jugement clinique exactement là où il doit être.",
  "No new clinical process": "Aucun nouveau processus clinique",
  "The consultation stays a conversation. Robi Care works in the background and presents its output for review afterwards.":
    "La consultation reste une conversation. Robi Care travaille en arrière-plan et présente son résultat pour relecture ensuite.",
  "Judgement stays clinical": "Le jugement reste clinique",
  "Suggestions are drafts. The clinician decides what is accurate, what is relevant, and what belongs in the record.":
    "Les suggestions sont des brouillons. Le clinicien décide de ce qui est exact, de ce qui est pertinent et de ce qui doit figurer au dossier.",
  "One platform underneath": "Une seule plateforme en arrière-plan",
  "Robi Care runs on the TMU · TeleMeetUp Enablement Platform, so governance and integrations are shared rather than duplicated.":
    "Robi Care s'exécute sur la TMU · TeleMeetUp Enablement Platform, de sorte que la gouvernance et les intégrations sont mutualisées plutôt que dupliquées.",
  "Who it is for": "À qui il s'adresse",
  "Built for the teams who document care":
    "Conçu pour les équipes qui documentent les soins",
  "Seven audiences use Robi Care in different settings. In every case the clinician stays in control, and every record is reviewed by a person before it is finalized.":
    "Sept publics utilisent Robi Care dans des contextes différents. Dans tous les cas, le clinicien garde la maîtrise et chaque dossier est relu par une personne avant d'être finalisé.",
  "Next step": "Prochaine étape",
  "See how Robi Care fits your clinic":
    "Découvrez comment Robi Care s'intègre à votre clinique",
  "Talk to the team about your documentation workflow, or get started on the platform today.":
    "Parlez à l'équipe de votre flux de documentation, ou commencez dès aujourd'hui sur la plateforme.",
  "Documentation that supports clinical care":
    "Une documentation au service des soins cliniques",
  "Bring Robi Care into your clinic and keep the clinician in control of every note.":
    "Adoptez Robi Care dans votre clinique et laissez le clinicien maîtriser chaque note.",

  // Solutions page — use-case cards
  "Conversation capture": "Capture de la conversation",
  "Turn the spoken consultation into an accurate, timestamped transcript without asking the clinician to type or dictate.":
    "Transformez la consultation parlée en une transcription horodatée et fidèle, sans demander au clinicien de saisir ou de dicter.",
  "Runs alongside the visit rather than replacing it":
    "Fonctionne en parallèle de la consultation plutôt que de la remplacer",
  "Speaker-aware transcript for clear attribution":
    "Transcription distinguant les locuteurs pour une attribution claire",
  "Works for in-room and remote consultations":
    "Fonctionne pour les consultations en présentiel et à distance",
  "Structured documentation": "Documentation structurée",
  "Organise the transcript into the note structure your team already uses, so documentation is ready for review in seconds.":
    "Organisez la transcription selon la structure de note que votre équipe utilise déjà, pour une documentation prête à être relue en quelques secondes.",
  "History, findings, assessment, and plan sections":
    "Sections antécédents, observations, évaluation et plan",
  "Draft notes that stay editable until approved":
    "Des notes brouillons qui restent modifiables jusqu'à leur approbation",
  "Consistent structure across the whole clinical team":
    "Une structure cohérente pour toute l'équipe clinique",
  "Follow-up coordination": "Coordination du suivi",
  "Surface referrals, recalls, and next appointments as clear actions so nothing slips between visits.":
    "Faites apparaître les orientations, les rappels et les prochains rendez-vous comme des actions claires, pour que rien ne passe entre les visites.",
  "Action list generated from the consultation":
    "Liste d'actions générée à partir de la consultation",
  "Referrals and recalls captured in one place":
    "Orientations et rappels regroupés au même endroit",
  "Clear ownership for every follow-up step":
    "Une responsabilité claire pour chaque étape du suivi",

  // Solutions page — audience detail labels
  "The challenge": "Le défi",
  "How Robi Care helps": "Comment Robi Care aide",
  "Where human review occurs": "Où intervient la relecture humaine",

  // Solutions page — audiences
  "Manual charting eats into the time available for patients, and the note is often written after the consultation has ended.":
    "La tenue manuelle du dossier empiète sur le temps disponible pour les patients, et la note est souvent rédigée après la fin de la consultation.",
  "Robi Care captures the consultation with consent and prepares a structured draft note, working alongside existing EMR and EHR systems.":
    "Robi Care capture la consultation avec le consentement du patient et prépare une note brouillon structurée, en complément des systèmes EMR et EHR existants.",
  "The physician reviews, corrects and signs every note before it is finalized.":
    "Le médecin relit, corrige et signe chaque note avant sa finalisation.",
  "Documentation support that keeps clinical teams talking to each other, not to a screen.":
    "Une assistance documentaire qui aide les équipes cliniques à se parler entre elles, plutôt qu'à un écran.",
  "Nursing and Allied Health": "Soins infirmiers et professions paramédicales",
  "Handovers and observations are time-consuming to document consistently across shifts and teams.":
    "Les transmissions et les observations demandent beaucoup de temps pour être documentées de manière cohérente d'une équipe et d'un service à l'autre.",
  "Robi Care captures structured observations and shift handovers so the record reflects what was actually said and seen.":
    "Robi Care capture les observations structurées et les transmissions de service, afin que le dossier reflète ce qui a réellement été dit et observé.",
  "The nurse or allied health professional reviews and approves before the record is used.":
    "L'infirmier ou le professionnel paramédical relit et approuve avant que le dossier ne soit utilisé.",
  "Walk-In and Family-Medicine Clinics":
    "Cliniques sans rendez-vous et de médecine de famille",
  "High patient volume leaves little time for documentation between appointments.":
    "Un volume élevé de patients laisse peu de temps pour la documentation entre les rendez-vous.",
  "Robi Care streamlines intake and consultation notes, speech-enabled in the clinician's spoken language.":
    "Robi Care simplifie l'accueil et les notes de consultation, avec la reconnaissance vocale dans la langue parlée par le clinicien.",
  "The clinician approves every note before it enters the patient record.":
    "Le clinicien approuve chaque note avant son intégration au dossier du patient.",
  "Hospital Emergency Departments": "Services d'urgence hospitaliers",
  "Fast-moving, high-acuity cases require rapid, accurate documentation under pressure.":
    "Les cas évolutifs et de haute acuité exigent une documentation rapide et précise sous pression.",
  "Robi Care supports rapid, multilingual documentation and intake during triage and treatment.":
    "Robi Care prend en charge une documentation et un accueil rapides et multilingues pendant le triage et le traitement.",
  "The attending clinician reviews and authorizes records, with accountable escalation paths.":
    "Le clinicien responsable relit et autorise les dossiers, avec des voies d'escalade clairement établies.",
  "EMS Providers": "Intervenants des services médicaux d'urgence",
  "Field documentation is difficult to capture accurately in real time while care is being delivered.":
    "La documentation sur le terrain est difficile à saisir avec exactitude en temps réel pendant la prise en charge.",
  "Robi Care captures field information and prepares structured handover records for receiving hospitals.":
    "Robi Care capture les informations de terrain et prépare des dossiers de transmission structurés pour les hôpitaux receveurs.",
  "EMS personnel and receiving clinicians review before handover records are finalized.":
    "Le personnel des services médicaux d'urgence et les cliniciens receveurs relisent avant la finalisation des dossiers de transmission.",
  "Field information captured in the moment, reviewed by both teams before it is finalized.":
    "Des informations de terrain recueillies sur le moment, relues par les deux équipes avant leur finalisation.",
  "Hospital Administrators": "Administrateurs hospitaliers",
  "Limited visibility into documentation workload, cost and governance across departments.":
    "Une visibilité limitée sur la charge de documentation, les coûts et la gouvernance entre les services.",
  "Robi Care provides workflow consistency, visibility and cost accountability across the institution, with administrative and clinical governance oversight retained throughout.":
    "Robi Care assure la cohérence des flux de travail, la visibilité et la responsabilité des coûts à l'échelle de l'établissement, tout en maintenant la supervision administrative et la gouvernance clinique.",
  "Administrative and clinical governance oversight is retained throughout.":
    "La supervision administrative et la gouvernance clinique sont maintenues tout au long du processus.",
  "Government and Public-Health Programs":
    "Programmes gouvernementaux et de santé publique",
  "Extending consistent clinical documentation support across public health systems is resource-intensive.":
    "Étendre un soutien cohérent à la documentation clinique à l'ensemble des systèmes de santé publique mobilise d'importantes ressources.",
  "Robi Care is available through Public-Private Partnerships for national or regional programs, deployed in-country via the SAAAS Platform.":
    "Robi Care est disponible via des partenariats public-privé pour les programmes nationaux ou régionaux, déployé dans le pays via la SAAAS Platform.",
  "Clinical governance remains with local healthcare institutions.":
    "La gouvernance clinique reste confiée aux institutions de santé locales.",

  // AI Governance — hero
  "Clinical AI that can be constrained, examined and stopped.":
    "Une IA clinique que l'on peut encadrer, examiner et arrêter.",
  "Robi Care is built around a single rule: AI prepares, clinicians decide. Every generated note is a draft until a clinician reviews and approves it — and that review is part of the workflow, not an optional step.":
    "Robi Care repose sur une règle unique : l'IA prépare, le clinicien décide. Chaque note générée reste un brouillon tant qu'un clinicien ne l'a pas vérifiée et approuvée — et cette vérification fait partie du flux de travail, elle n'est pas une étape facultative.",
  "Review-before-use is the default. The clinician reads the draft, corrects it, and approves it before anything is filed.":
    "La vérification avant utilisation est le comportement par défaut. Le clinicien lit le brouillon, le corrige et l'approuve avant tout classement.",

  // AI Governance — opening section
  "HUMAN AUTHORITY BY DESIGN": "L'AUTORITÉ HUMAINE PAR CONCEPTION",
  "Robi Care combines clinical workflow support with policy gates, human authorization and traceable evidence through SSOT-AI-GOV.":
    "Robi Care associe l'assistance au flux de travail clinique à des contrôles de politique, une autorisation humaine et des preuves traçables via SSOT-AI-GOV.",
  "See the governance architecture": "Voir l'architecture de gouvernance",
  "Fail-closed": "Refus par défaut",
  "Restricted actions are denied when authorization, required evidence or governance services are unavailable.":
    "Les actions restreintes sont refusées lorsque l'autorisation, les preuves requises ou les services de gouvernance sont indisponibles.",
  "Draft clinical content remains visibly unapproved until an authorized professional signs off.":
    "Le contenu clinique en brouillon reste visiblement non approuvé tant qu'un professionnel autorisé ne l'a pas validé.",

  // AI Governance — section eyebrows
  "Governance principles": "Principes de gouvernance",
  Architecture: "Architecture",
  Questions: "Questions",
  "Data handling": "Traitement des données",

  // AI Governance — four commitments
  "Four commitments that shape how the system behaves":
    "Quatre engagements qui déterminent le comportement du système",
  "These are workflow commitments, not marketing claims. Each one describes something the product does — or deliberately refuses to do.":
    "Ce sont des engagements de flux de travail, non des arguments marketing. Chacun décrit ce que le produit fait — ou refuse délibérément de faire.",
  "Clinician oversight": "Supervision par le clinicien",
  "A qualified clinician owns every clinical decision. Robi Care prepares material for that decision; it never makes the decision.":
    "Un clinicien qualifié est responsable de chaque décision clinique. Robi Care prépare les éléments de cette décision ; il ne prend jamais la décision.",
  "Review before use": "Vérification avant utilisation",
  "Generated output is a draft. It is read, corrected, and approved by a clinician before it enters the patient record.":
    "Le résultat généré est un brouillon. Il est lu, corrigé et approuvé par un clinicien avant d'intégrer le dossier du patient.",
  "Transparency of output": "Transparence du résultat",
  "Clinicians can see what was captured and what was generated, so the basis of every note is visible rather than assumed.":
    "Les cliniciens voient ce qui a été recueilli et ce qui a été généré, de sorte que le fondement de chaque note est visible plutôt que supposé.",
  "Deliberate data handling": "Traitement délibéré des données",
  "Patient information is handled only for the purpose of preparing the note, under the clinic's own policies and controls.":
    "Les informations du patient ne sont traitées que dans le but de préparer la note, selon les politiques et les contrôles propres à la clinique.",

  // AI Governance — eight principles
  "The rules the system is held to":
    "Les règles auxquelles le système est tenu",
  "Eight principles define what the platform checks before it acts, what it refuses to do by default, and what it records afterwards.":
    "Huit principes définissent ce que la plateforme vérifie avant d'agir, ce qu'elle refuse de faire par défaut et ce qu'elle consigne ensuite.",
  "AI actions begin with explicit identity, role and authorization checks":
    "Les actions de l'IA commencent par des contrôles explicites d'identité, de rôle et d'autorisation",
  "Applicable policies are evaluated before any action proceeds":
    "Les politiques applicables sont évaluées avant que toute action ne se poursuive",
  "Restricted actions are denied by default when authorization or information is missing":
    "Les actions restreintes sont refusées par défaut lorsque l'autorisation ou l'information fait défaut",
  "Higher-risk outputs require human approval":
    "Les résultats à risque plus élevé exigent une approbation humaine",
  "Material actions generate time-stamped evidence and governance receipts":
    "Les actions importantes génèrent des preuves horodatées et des reçus de gouvernance",
  "Administrators can suspend workflows, models, integrations or user privileges":
    "Les administrateurs peuvent suspendre des flux de travail, des modèles, des intégrations ou des privilèges d'utilisateur",
  "Incidents can be reconstructed from protected records":
    "Les incidents peuvent être reconstitués à partir de dossiers protégés",
  "Model confidence never overrides an applicable clinical or organizational rule":
    "La confiance du modèle ne prime jamais sur une règle clinique ou organisationnelle applicable",

  // AI Governance — architecture section
  "How a request is governed end to end":
    "Comment une requête est gouvernée de bout en bout",
  "Every request passes through identity and policy gates before it reaches a workflow service or the evidence ledger, and no output reaches a record without clinician review.":
    "Chaque requête franchit des contrôles d'identité et de politique avant d'atteindre un service de flux de travail ou le registre de preuves, et aucun résultat n'atteint un dossier sans la vérification d'un clinicien.",
  "Fail-safe and fail-closed are design objectives subject to testing, validation and contractual scope — not a guarantee that failure or harm is impossible.":
    "La sécurité intégrée et le refus par défaut sont des objectifs de conception soumis aux tests, à la validation et au périmètre contractuel — et non la garantie qu'une défaillance ou un préjudice est impossible.",

  // AI Governance — architecture diagram
  "Governance architecture": "Architecture de gouvernance",
  "How a request moves from a care team member to a signed clinical record, and where identity, policy, evidence and human review sit in that path.":
    "Comment une requête passe d'un membre de l'équipe de soins à un dossier clinique signé, et où se situent l'identité, la politique, les preuves et la vérification humaine dans ce parcours.",
  "Clinician/Nurse/EMS/Administrator": "Clinicien/Infirmier/EMS/Administrateur",
  "Identity, Consent and Role Controls":
    "Contrôles d'identité, de consentement et de rôle",
  "SSOT-AI-GOV Policy Gates": "Contrôles de politique SSOT-AI-GOV",
  "parallel branches": "branches parallèles",
  "TMU Clinical Workflow Services": "Services de flux de travail clinique TMU",
  "Evidence Ledger and Audit Receipts": "Registre de preuves et reçus d'audit",
  converge: "convergence",
  "Approved AI Models and Clinical/Administrative Systems":
    "Modèles d'IA approuvés et systèmes cliniques/administratifs",
  "Clinician Review and Sign-off":
    "Vérification et validation par le clinicien",

  // AI Governance — oversight in practice
  "Oversight in practice": "La supervision en pratique",
  "Governance that can be inspected, not just asserted":
    "Une gouvernance que l'on peut inspecter, pas seulement affirmer",
  "Controls are only meaningful if someone can see them working. Administrators and compliance officers review how policies were applied, where actions were denied, and what evidence was produced.":
    "Les contrôles n'ont de sens que si quelqu'un peut les voir à l'œuvre. Les administrateurs et les responsables de la conformité examinent comment les politiques ont été appliquées, où des actions ont été refusées et quelles preuves ont été produites.",
  "Policy outcomes are visible": "Les résultats des politiques sont visibles",
  "Each decision shows which policy applied and whether the action proceeded, required approval, or was denied.":
    "Chaque décision indique quelle politique s'est appliquée et si l'action s'est poursuivie, a nécessité une approbation ou a été refusée.",
  "Exceptions are reviewable": "Les exceptions sont vérifiables",
  "Denials and approval requests are surfaced for review rather than silently dropped.":
    "Les refus et les demandes d'approbation sont présentés pour vérification plutôt que silencieusement écartés.",
  "Controls can be suspended": "Les contrôles peuvent être suspendus",
  "Administrators can stop workflows, models, integrations or user privileges when oversight requires it.":
    "Les administrateurs peuvent arrêter des flux de travail, des modèles, des intégrations ou des privilèges d'utilisateur lorsque la supervision l'exige.",
  "Governance is observable in practice: administrators and compliance officers review policy outcomes, evidence and exceptions on an ongoing basis.":
    "La gouvernance est observable en pratique : les administrateurs et les responsables de la conformité examinent en continu les résultats des politiques, les preuves et les exceptions.",

  // AI Governance — human in the loop
  "Human in the loop": "L'humain dans la boucle",
  "Decision control stays with the clinician":
    "Le contrôle des décisions reste au clinicien",
  "Automation is confined to the parts of documentation that do not require judgement. Everything that does require judgement is left where it belongs.":
    "L'automatisation se limite aux parties de la documentation qui n'exigent pas de jugement. Tout ce qui exige un jugement reste là où il doit être.",
  "The system drafts, the clinician decides":
    "Le système rédige, le clinicien décide",
  "Robi Care organises what was said into a structured note. It does not diagnose, prescribe, or act.":
    "Robi Care organise ce qui a été dit en une note structurée. Il ne pose pas de diagnostic, ne prescrit pas et n'agit pas.",
  "Approval is the gate to the record":
    "L'approbation est la porte d'accès au dossier",
  "Nothing generated reaches the patient record without a clinician's explicit approval.":
    "Rien de ce qui est généré n'atteint le dossier du patient sans l'approbation explicite d'un clinicien.",
  "Corrections are first-class":
    "Les corrections sont pleinement prises en compte",
  "Editing a draft is a normal part of the workflow, not a failure state. The clinician's version is the note.":
    "Modifier un brouillon fait normalement partie du flux de travail, ce n'est pas un état d'échec. La version du clinicien est la note.",
  "Human-in-the-loop is a workflow, not a disclaimer: the clinician's review is the step that turns a draft into a record.":
    "L'humain dans la boucle est un flux de travail, non une clause de non-responsabilité : la vérification du clinicien est l'étape qui transforme un brouillon en dossier.",

  // AI Governance — data handling
  "Patient information, handled deliberately":
    "Les informations du patient, traitées avec méthode",
  "Robi Care processes patient information for one purpose: preparing the note the clinician is working on. It is not repurposed, and it is not used to train models on your patients.":
    "Robi Care traite les informations du patient dans un seul but : préparer la note sur laquelle le clinicien travaille. Elles ne sont pas réutilisées à d'autres fins et ne servent pas à entraîner des modèles sur vos patients.",
  "Purpose-limited processing": "Traitement limité à la finalité",
  "Captured conversation is used to prepare the clinician's note and for nothing else.":
    "La conversation recueillie sert à préparer la note du clinicien et à rien d'autre.",
  "Clinic-controlled policy": "Politique contrôlée par la clinique",
  "Retention and access follow the clinic's own policies, applied to the documentation workflow.":
    "La conservation et l'accès suivent les politiques propres à la clinique, appliquées au flux de travail documentaire.",
  "Deployment specifics": "Spécificités du déploiement",
  "Hosting arrangements and certifications are [certification/region to be confirmed] and are agreed with each clinic.":
    "Les modalités d'hébergement et les certifications sont [certification/région à confirmer] et sont convenues avec chaque clinique.",

  // AI Governance — FAQ
  "Governance questions, answered plainly":
    "Les questions de gouvernance, expliquées simplement",
  "The questions clinicians and governance leads ask most often about how Robi Care behaves.":
    "Les questions que les cliniciens et les responsables de la gouvernance posent le plus souvent sur le comportement de Robi Care.",
  "Who is responsible for the final clinical note?":
    "Qui est responsable de la note clinique finale ?",
  "The clinician. Robi Care produces a structured draft from the captured consultation, but the clinician reviews, edits, and approves it before it is used. The clinician remains the decision-maker for every clinical action recorded in the note.":
    "Le clinicien. Robi Care produit un brouillon structuré à partir de la consultation recueillie, mais le clinicien le vérifie, le modifie et l'approuve avant son utilisation. Le clinicien reste le décideur pour chaque action clinique consignée dans la note.",
  "Can a note be filed without a clinician seeing it?":
    "Une note peut-elle être classée sans qu'un clinicien l'ait vue ?",
  "No. Review-before-use is a fixed part of the workflow. Generated content stays a draft until a clinician approves it, and the approval is what commits the note to the record.":
    "Non. La vérification avant utilisation fait partie intégrante du flux de travail. Le contenu généré reste un brouillon tant qu'un clinicien ne l'a pas approuvé, et c'est cette approbation qui inscrit la note au dossier.",
  "How does the clinician know what the system produced?":
    "Comment le clinicien sait-il ce que le système a produit ?",
  "The captured conversation and the generated draft are both visible to the reviewing clinician. Nothing is summarised away without the clinician being able to inspect the source material behind it.":
    "La conversation recueillie et le brouillon généré sont tous deux visibles par le clinicien qui vérifie. Rien n'est résumé au point que le clinicien ne puisse inspecter le matériel source qui le sous-tend.",
  "What happens to patient data?": "Qu'advient-il des données des patients ?",
  "Patient information is processed only to prepare the note the clinician is working on, and it is handled under the clinic's own data-handling policies. Specific hosting arrangements and certifications are [certification/region to be confirmed].":
    "Les informations du patient ne sont traitées que pour préparer la note sur laquelle le clinicien travaille, et elles sont gérées selon les politiques de traitement des données propres à la clinique. Les modalités d'hébergement et les certifications précises sont [certification/région à confirmer].",
  "Does Robi Care replace clinical judgement?":
    "Robi Care remplace-t-il le jugement clinique ?",
  "No. It removes the typing, not the judgement. The system drafts and organises; the clinician interprets, decides, and signs off.":
    "Non. Il supprime la saisie, pas le jugement. Le système rédige et organise ; le clinicien interprète, décide et valide.",

  // AI Governance — closing call to action
  "Review the governance model with us":
    "Examinez le modèle de gouvernance avec nous",
  "Talk to the team about how review-before-use, transparency, and data handling would work in your clinic.":
    "Parlez à l'équipe de la manière dont la vérification avant utilisation, la transparence et le traitement des données fonctionneraient dans votre clinique.",

  // Pricing — hero
  "Transparent pricing, built from real usage":
    "Une tarification transparente, fondée sur l'usage réel",
  "Every Robi Care tier is assembled from the same three metered components — transcription, model access, and audio storage — so you can see exactly what you are paying for.":
    "Chaque formule Robi Care est composée des trois mêmes éléments mesurés — transcription, accès au modèle et stockage audio — afin que vous voyiez exactement ce que vous payez.",
  "Pricing is metered from the same base unit rates across every tier, with no hidden platform fee.":
    "La tarification est mesurée selon les mêmes tarifs unitaires de base pour chaque formule, sans frais de plateforme cachés.",

  // Pricing — tiers section
  Plans: "Formules",
  "Three tiers, one platform": "Trois formules, une seule plateforme",
  "Choose the daily transcription allowance that matches your practice. Each tier includes the full Robi Care workflow on the TMU · TeleMeetUp Enablement Platform.":
    "Choisissez l'allocation quotidienne de transcription adaptée à votre pratique. Chaque formule inclut l'intégralité du flux de travail Robi Care sur la TMU · TeleMeetUp Enablement Platform.",

  // Pricing — tier cards
  "For a single clinician or a small practice getting documentation under control.":
    "Pour un clinicien seul ou un petit cabinet qui reprend sa documentation en main.",
  "For a multi-clinician practice that documents across a full working day.":
    "Pour un cabinet de plusieurs cliniciens qui documente tout au long d'une journée de travail.",
  "For hospital groups and networks running documentation at organisational scale.":
    "Pour les groupes hospitaliers et les réseaux qui gèrent la documentation à l'échelle de l'organisation.",
  "Most popular": "Le plus choisi",
  "Transcription allowance": "Allocation de transcription",
  "Speech-to-Text Transcription": "Transcription parole-texte",
  "7,200 minutes per month": "7 200 minutes par mois",
  "36,000 minutes per month": "36 000 minutes par mois",
  "360,000 minutes per month": "360 000 minutes par mois",
  "Access to ChatGPT": "Accès à ChatGPT",
  "2,880 units (1,000-token units) per month":
    "2 880 unités (unités de 1 000 jetons) par mois",
  "14,400 units (1,000-token units) per month":
    "14 400 unités (unités de 1 000 jetons) par mois",
  "144,000 units (1,000-token units) per month":
    "144 000 unités (unités de 1 000 jetons) par mois",
  "Audio Recording": "Enregistrement audio",
  "3.6 GB per month": "3,6 Go par mois",
  "18 GB per month": "18 Go par mois",
  "180 GB per month": "180 Go par mois",
  "Monthly total": "Total mensuel",

  // Pricing — usage table
  "Monthly usage breakdown by tier, with unit counts and US$ amounts":
    "Détail de l'usage mensuel par formule, avec le nombre d'unités et les montants en US$",
  Units: "Unités",
  "Number of Units": "Nombre d'unités",
  US$: "US$",
  "Speech-to-Text Transcription (minutes)":
    "Transcription parole-texte (minutes)",
  "Access to ChatGPT (1,000 tokens)": "Accès à ChatGPT (1 000 jetons)",
  "Audio Recording (GB per month)": "Enregistrement audio (Go par mois)",

  // Pricing — base unit rates note
  "Base unit rates:": "Tarifs unitaires de base :",
  "Speech-to-Text Transcription $0.074/minute · Access to ChatGPT $0.02 per 1,000 tokens · Audio Recording $5.25/GB per month. Monthly totals are the sum of the metered components shown for each tier.":
    "Transcription parole-texte 0,074 $/minute · Accès à ChatGPT 0,02 $ par 1 000 jetons · Enregistrement audio 5,25 $/Go par mois. Les totaux mensuels correspondent à la somme des éléments mesurés indiqués pour chaque formule.",

  // Pricing — included section
  Included: "Inclus",
  "What every tier includes": "Ce que chaque formule inclut",
  "The differences between tiers are capacity, not capability. The workflow itself is the same at every level.":
    "Les différences entre les formules portent sur la capacité, non sur les fonctionnalités. Le flux de travail lui-même est identique à tous les niveaux.",
  "The full Robi Care workflow": "L'intégralité du flux de travail Robi Care",
  "Conversation capture, structured documentation, and follow-up coordination are included in every tier.":
    "La saisie des conversations, la documentation structurée et la coordination du suivi sont incluses dans chaque formule.",
  "The TMU · TeleMeetUp account you already have":
    "Le compte TMU · TeleMeetUp que vous possédez déjà",
  "Robi Care uses the existing TMU · TeleMeetUp account system, so there is no separate onboarding flow to run.":
    "Robi Care utilise le système de comptes TMU · TeleMeetUp existant, sans flux d'intégration distinct à exécuter.",
  "Metered, transparent usage": "Un usage mesuré et transparent",
  "Each tier is priced from the same three base unit rates, so the monthly total is always traceable to real usage.":
    "Chaque formule est tarifée à partir des trois mêmes tarifs unitaires de base, de sorte que le total mensuel reste toujours rattaché à l'usage réel.",

  // Pricing — closing call to action
  "Start with the tier that fits your practice":
    "Commencez par la formule adaptée à votre pratique",
  "Create your account on the TMU · TeleMeetUp Enablement Platform and choose a Robi Care tier when you are ready.":
    "Créez votre compte sur la TMU · TeleMeetUp Enablement Platform et choisissez une formule Robi Care lorsque vous serez prêt.",

  // Contact page — hero
  "Talk to the Robi Care team": "Parlez à l'équipe Robi Care",
  "Tell us about your documentation workflow and we will show you how Robi Care fits. Every enquiry reaches hello@tmu.ai.":
    "Décrivez-nous votre flux de travail documentaire et nous vous montrerons comment Robi Care s'y intègre. Chaque demande parvient à hello@tmu.ai.",
  "Enquiries are answered by the Robi Care team, usually within one business day.":
    "Les demandes sont traitées par l'équipe Robi Care, généralement sous un jour ouvré.",

  // Contact page — enquiry section
  "Send an enquiry": "Envoyer une demande",
  "How can we help?": "Comment pouvons-nous vous aider ?",
  "Share a little about your organisation and what you would like to solve. Fields are validated as you go.":
    "Présentez brièvement votre organisation et ce que vous souhaitez résoudre. Les champs sont validés au fur et à mesure.",

  // Contact page — contact details
  "Enquiries submitted here are delivered to the same inbox.":
    "Les demandes envoyées ici sont transmises à la même boîte de réception.",
  "Deployment region": "Région de déploiement",
  "[certification/region to be confirmed]":
    "[certification/région à confirmer]",
  "Hosting region and certifications are confirmed per deployment.":
    "La région d'hébergement et les certifications sont confirmées pour chaque déploiement.",
  Governance: "Gouvernance",
  "Robi Care runs on the platform's existing account and governance layer.":
    "Robi Care s'exécute sur la couche de compte et de gouvernance existante de la plateforme.",

  // Contact form — labels
  Name: "Nom",
  Email: "E-mail",
  Organisation: "Organisation",
  Message: "Message",

  // Contact form — validation messages
  "Please enter your email address.": "Veuillez saisir votre adresse e-mail.",
  "Please enter a valid email address.":
    "Veuillez saisir une adresse e-mail valide.",
  "Please enter your name.": "Veuillez saisir votre nom.",
  "Please enter your organisation.": "Veuillez saisir votre organisation.",
  "Please tell us how we can help.":
    "Veuillez nous indiquer comment nous pouvons vous aider.",

  // Contact form — states and actions
  "Sending…": "Envoi…",
  "Thank you — your enquiry has been sent":
    "Merci — votre demande a bien été envoyée",
  "Your message has reached the Robi Care team at hello@tmu.ai. We usually respond within one business day.":
    "Votre message est parvenu à l'équipe Robi Care à hello@tmu.ai. Nous répondons généralement sous un jour ouvré.",
  "We could not send your enquiry just now. Please try again, or email hello@tmu.ai directly.":
    "Nous n'avons pas pu envoyer votre demande pour le moment. Veuillez réessayer ou écrire directement à hello@tmu.ai.",

  // Sponsorship page — hero
  "Sponsorship program": "Programme de parrainage",
  "Sponsorship is a strategic investment in community healthcare access, not charity.":
    "Le parrainage est un investissement stratégique dans l'accès aux soins de santé communautaires, et non une œuvre de bienfaisance.",
  "Robi Care sponsorship puts governed clinical documentation support into the hands of healthcare professionals and institutions who need it — and it is designed to be reported on, reviewed, and renewed like any other investment in the care ecosystem.":
    "Le parrainage Robi Care met un soutien documentaire clinique gouverné entre les mains des professionnels de santé et des institutions qui en ont besoin — et il est conçu pour être documenté, évalué et renouvelé comme tout autre investissement dans l'écosystème des soins.",
  "Sponsorship is directed at the clinicians and institutions serving communities with the least capacity to absorb documentation overhead.":
    "Le parrainage est destiné aux cliniciens et aux institutions qui servent les communautés ayant le moins de capacité à absorber la charge documentaire.",

  // Sponsorship page — what sponsorship funds
  "What sponsorship funds": "Ce que finance le parrainage",
  "Sponsorship subsidizes the subscription, not the standard of care":
    "Le parrainage subventionne l'abonnement, non la qualité des soins",
  "Robi Care sponsorship subsidizes subscription costs for healthcare professionals and institutions who need it. The clinician receives the same platform, the same governance model, and the same review-before-use workflow as any paying customer — the sponsor removes the cost barrier, not the capability.":
    "Le parrainage Robi Care subventionne les coûts d'abonnement des professionnels de santé et des institutions qui en ont besoin. Le clinicien reçoit la même plateforme, le même modèle de gouvernance et le même flux de travail de vérification avant utilisation que tout client payant — le parrain supprime la barrière de coût, non la capacité.",
  "Underserved communities come first":
    "Les communautés mal desservies passent en premier",
  "Sponsored subscriptions are directed to the clinicians and institutions serving communities with the least capacity to absorb documentation overhead.":
    "Les abonnements parrainés sont destinés aux cliniciens et aux institutions qui servent les communautés ayant le moins de capacité à absorber la charge documentaire.",
  "The subsidy is the subscription": "La subvention, c'est l'abonnement",
  "Sponsorship covers the metered subscription cost. It does not buy influence over clinical decisions, which stay with the treating clinician.":
    "Le parrainage couvre le coût de l'abonnement à l'usage. Il n'achète aucune influence sur les décisions cliniques, qui restent entre les mains du clinicien traitant.",
  "Access is governed, not gifted": "L'accès est gouverné, non offert",
  "Sponsored access is administered through the same account and governance model as every other deployment on the platform.":
    "L'accès parrainé est administré selon le même compte et le même modèle de gouvernance que tout autre déploiement sur la plateforme.",
  "A sponsored subscription is a working clinical tool, not a donation — it is used in the same workflow as every other Robi Care deployment.":
    "Un abonnement parrainé est un outil clinique opérationnel, non un don — il est utilisé dans le même flux de travail que tout autre déploiement Robi Care.",

  // Sponsorship page — who sponsors
  "Who sponsors": "Qui parraine",
  "Leading players in the community healthcare ecosystem":
    "Des acteurs de premier plan de l'écosystème des soins de santé communautaires",
  "Robi Care sponsors are organisations already invested in community health. They sponsor because access to governed clinical documentation is part of the infrastructure their own work depends on.":
    "Les parrains de Robi Care sont des organisations déjà engagées dans la santé communautaire. Ils parrainent parce que l'accès à une documentation clinique gouvernée fait partie de l'infrastructure dont dépend leur propre travail.",
  "Health systems": "Systèmes de santé",
  "Hospitals, networks and care groups that want documentation support to reach the clinicians and communities they already serve.":
    "Hôpitaux, réseaux et groupes de soins qui souhaitent que le soutien documentaire atteigne les cliniciens et les communautés qu'ils servent déjà.",
  NGOs: "ONG",
  "Development and community organisations funding access to clinical documentation where public capacity is thinnest.":
    "Organisations de développement et communautaires qui financent l'accès à la documentation clinique là où les capacités publiques sont les plus limitées.",
  "Healthcare-focused corporations": "Entreprises du secteur de la santé",
  "Companies whose products and services sit inside the care pathway and who invest in the ecosystem they operate in.":
    "Entreprises dont les produits et services s'inscrivent dans le parcours de soins et qui investissent dans l'écosystème où elles opèrent.",
  "Government and PPP partners": "Partenaires gouvernementaux et PPP",
  "Public institutions and public-private partnerships extending governed clinical AI into national and regional programmes.":
    "Institutions publiques et partenariats public-privé qui étendent une IA clinique gouvernée à des programmes nationaux et régionaux.",

  // Sponsorship page — tiers
  "Sponsorship levels": "Niveaux de parrainage",
  "Three levels of sponsorship": "Trois niveaux de parrainage",
  "Each level is defined by how many clinicians or institutions it puts on the platform. Sponsorship is priced from Robi Care's published subscription rates, so the commitment is transparent from the start.":
    "Chaque niveau est défini par le nombre de cliniciens ou d'institutions qu'il place sur la plateforme. Le parrainage est facturé selon les tarifs d'abonnement publiés de Robi Care, de sorte que l'engagement est transparent dès le départ.",
  "Sponsors 1 Premium subscription": "Parraine 1 abonnement Premium",
  "Supports one independent physician or clinician":
    "Soutient un médecin ou un clinicien indépendant",
  "The entry point for an organisation that wants to put governed documentation support in the hands of a single clinician who could not otherwise afford it.":
    "Le point d'entrée pour une organisation qui souhaite mettre un soutien documentaire gouverné entre les mains d'un seul clinicien qui ne pourrait pas se le permettre autrement.",
  "Sponsors 5 Premium subscriptions": "Parraine 5 abonnements Premium",
  "Supports a clinic or small care team":
    "Soutient une clinique ou une petite équipe soignante",
  "Funds a whole small care team, so a clinic can standardise its documentation workflow across the people who share the same patients.":
    "Finance toute une petite équipe soignante, afin qu'une clinique puisse uniformiser son flux de travail documentaire entre les personnes qui partagent les mêmes patients.",
  "Sponsors 10+ Premium subscriptions or a Business-tier deployment":
    "Parraine 10 abonnements Premium ou plus, ou un déploiement de niveau Business",
  "Supports a hospital department or regional program":
    "Soutient un service hospitalier ou un programme régional",
  "Scales sponsorship to a department or a regional programme, with the deployment shape agreed around the care setting being supported.":
    "Étend le parrainage à un service ou à un programme régional, la forme du déploiement étant convenue en fonction de l'environnement de soins soutenu.",
  "Custom — contact us.": "Sur mesure — contactez-nous.",
  "Sponsorship levels are based on Robi Care's published subscription pricing.":
    "Les niveaux de parrainage sont fondés sur les tarifs d'abonnement publiés de Robi Care.",

  // Sponsorship page — closing call to action
  "Talk to the team about the level of sponsorship that fits your organisation and the community you want to support.":
    "Parlez à l'équipe du niveau de parrainage adapté à votre organisation et à la communauté que vous souhaitez soutenir.",

  // Sovereign Deployment — hero
  "Sovereign Deployment": "Déploiement souverain",
  "Healthcare enablement operated within the country it serves.":
    "Une assistance à la santé exploitée dans le pays qu'elle sert.",
  "Robi Care is available as a managed service, deployed in-country through the SAAAS Platform for Sovereign AI — economical, readily accessible and built for democratized access. Deployment options include locally selected or approved sovereign hosting, local data-residency configuration, jurisdiction-specific retention and consent policies, approved model routing, local language and clinical-document formats, in-country support, and transparent metering and institutional reporting.":
    "Robi Care est disponible en tant que service géré, déployé dans le pays via la SAAAS Platform for Sovereign AI — économique, aisément accessible et conçu pour un accès démocratisé. Les options de déploiement comprennent un hébergement souverain choisi ou approuvé localement, une configuration locale de résidence des données, des politiques de conservation et de consentement propres à chaque juridiction, un routage de modèles approuvé, des formats locaux de langue et de documents cliniques, un support dans le pays, ainsi qu'une mesure transparente et un reporting institutionnel.",
  "Deployment is described in workflow terms: where processing happens, who holds custody, and how access is administered.":
    "Le déploiement est décrit en termes de flux de travail : où le traitement a lieu, qui détient la garde des données et comment l'accès est administré.",

  // Sovereign Deployment — accessible by design
  "Accessible by design": "Accessible par conception",
  "Local service. Sovereign options. Practical economics.":
    "Service local. Options souveraines. Économie pratique.",
  "Robi Care is designed for managed, in-country service through SAAAS, supporting local data controls, approved model routing and partnership-led adoption.":
    "Robi Care est conçu pour un service géré dans le pays via SAAAS, prenant en charge les contrôles locaux des données, un routage de modèles approuvé et une adoption portée par les partenariats.",
  "In-country operations": "Opérations dans le pays",
  "Deployment patterns aligned to local institutions, regulation and support.":
    "Des modèles de déploiement alignés sur les institutions, la réglementation et le support locaux.",
  "Data sovereignty": "Souveraineté des données",
  "Configurable residency, retention and access controls for each jurisdiction.":
    "Des contrôles configurables de résidence, de conservation et d'accès pour chaque juridiction.",
  "Democratized access": "Accès démocratisé",
  "Transparent usage-based economics for individual professionals through national programs.":
    "Une économie transparente fondée sur l'usage pour les professionnels individuels, via des programmes nationaux.",

  // Sovereign Deployment — the problem
  "Documentation tools often move clinical data somewhere you cannot see":
    "Les outils de documentation déplacent souvent les données cliniques vers un lieu que vous ne pouvez pas voir",
  "When a documentation service is hosted outside the provider's control, the clinical governance team loses visibility of where patient content is processed, who can reach it, and how long it is kept.":
    "Lorsqu'un service de documentation est hébergé hors du contrôle du prestataire, l'équipe de gouvernance clinique perd la visibilité sur le lieu de traitement du contenu des patients, sur les personnes qui peuvent y accéder et sur la durée de conservation.",
  "The boundary becomes unclear": "La frontière devient floue",
  "Once content leaves the clinical environment, the provider can no longer describe the processing boundary in terms its own governance process recognises.":
    "Une fois le contenu sorti de l'environnement clinique, le prestataire ne peut plus décrire la frontière de traitement dans des termes que son propre processus de gouvernance reconnaît.",
  "Custody is quietly transferred":
    "La garde des données est transférée sans bruit",
  "A vendor that stores the record in its own tenancy becomes a second custodian of clinical data, which complicates retention and deletion.":
    "Un fournisseur qui stocke le dossier dans son propre environnement devient un second dépositaire des données cliniques, ce qui complique la conservation et la suppression.",
  "Review is treated as optional":
    "La vérification est traitée comme facultative",
  "Generated text that reaches the record without a clinician reading it is a clinical risk, not a time saving.":
    "Un texte généré qui parvient au dossier sans qu'un clinicien ne l'ait lu constitue un risque clinique, et non un gain de temps.",

  // Sovereign Deployment — how it works
  "Four steps, each with a clear owner":
    "Quatre étapes, chacune avec un responsable clairement identifié",
  "Sovereign deployment is a workflow property, not a marketing claim. These are the four stages every consultation passes through.":
    "Le déploiement souverain est une propriété du flux de travail, non une affirmation marketing. Voici les quatre étapes que traverse chaque consultation.",
  "Capture inside the care setting": "Recueillir au sein du cadre de soins",
  "The consultation is captured where care already happens — in the room or over a remote session — with no data leaving the clinical environment before it is processed.":
    "La consultation est recueillie là où les soins ont déjà lieu — en cabinet ou lors d'une session à distance — sans qu'aucune donnée ne quitte l'environnement clinique avant son traitement.",
  "Process in the deployment you control":
    "Traiter dans le déploiement que vous contrôlez",
  "Transcription and structuring run in the deployment your organisation governs, so the processing boundary is the one your clinical governance team has approved.":
    "La transcription et la structuration s'exécutent dans le déploiement que votre organisation gouverne, de sorte que la frontière de traitement est celle approuvée par votre équipe de gouvernance clinique.",
  "Review before anything is committed": "Vérifier avant toute validation",
  "Drafts are presented to the clinician for review. Nothing is written into the record until a person has read it and accepted it.":
    "Les brouillons sont présentés au clinicien pour vérification. Rien n'est écrit dans le dossier tant qu'une personne ne l'a pas lu et accepté.",
  "Retain under your own policy": "Conserver selon votre propre politique",
  "Retention, export, and deletion follow the policy your organisation already applies to clinical records, rather than a vendor default.":
    "La conservation, l'export et la suppression suivent la politique que votre organisation applique déjà aux dossiers cliniques, plutôt qu'un paramètre par défaut du fournisseur.",

  // Sovereign Deployment — proof points
  "What sovereignty means in practice":
    "Ce que la souveraineté signifie en pratique",
  "Four commitments that can be checked against your own governance requirements rather than taken on trust.":
    "Quatre engagements qui peuvent être vérifiés au regard de vos propres exigences de gouvernance plutôt que pris sur parole.",
  "A defined processing boundary": "Une frontière de traitement définie",
  "Clinical content is processed within the deployment your organisation governs. The boundary is documented so it can be reviewed, not assumed.":
    "Le contenu clinique est traité au sein du déploiement que votre organisation gouverne. La frontière est documentée afin de pouvoir être vérifiée, et non présumée.",
  "Data custody stays with the provider":
    "La garde des données reste au prestataire",
  "The care provider remains the custodian of the record. Robi Care operates on the data to produce a draft and does not claim ownership of it.":
    "Le prestataire de soins reste le dépositaire du dossier. Robi Care opère sur les données pour produire un brouillon et n'en revendique pas la propriété.",
  "Access tied to existing accounts": "Un accès lié aux comptes existants",
  "Access uses the TMU · TeleMeetUp account system your organisation already administers, so joiners and leavers are handled by one process.":
    "L'accès utilise le système de comptes TMU · TeleMeetUp que votre organisation administre déjà, de sorte que les arrivées et les départs sont gérés par un seul processus.",
  "Reviewable by design": "Vérifiable par conception",
  "Every draft carries its source consultation and the review decision, so an auditor can trace how a note came to exist.":
    "Chaque brouillon porte sa consultation source et la décision de vérification, de sorte qu'un auditeur peut retracer la manière dont une note a été créée.",
  "Deployment details": "Détails du déploiement",
  "Specific hosting regions and certifications are confirmed per deployment. Where a claim would normally appear, this page shows a placeholder until it is verified with your organisation.":
    "Les régions d'hébergement et les certifications précises sont confirmées au cas par cas pour chaque déploiement. Là où une affirmation figurerait habituellement, cette page affiche un espace réservé jusqu'à sa vérification avec votre organisation.",
  "Hosting region": "Région d'hébergement",
  Certification: "Certification",
  "Data residency": "Résidence des données",
  "Underlying platform": "Plateforme sous-jacente",

  // Sovereign Deployment — closing call to action
  "Review the deployment model with your governance team":
    "Examinez le modèle de déploiement avec votre équipe de gouvernance",
  "Bring your data-protection and clinical-governance leads. We will walk through the processing boundary, custody, access, and retention in the terms your organisation already uses.":
    "Faites venir vos responsables de la protection des données et de la gouvernance clinique. Nous passerons en revue la frontière de traitement, la garde des données, l'accès et la conservation dans les termes que votre organisation utilise déjà.",
  "Clinical judgement stays with the clinician; the platform handles the documentation burden around it.":
    "Le jugement clinique reste au clinicien ; la plateforme prend en charge la charge documentaire qui l'entoure.",
  "Deploy documentation you can account for":
    "Déployez une documentation dont vous pouvez rendre compte",
  "Start on the TMU · TeleMeetUp Enablement Platform and keep clinical content inside a boundary your organisation governs.":
    "Commencez sur la TMU · TeleMeetUp Enablement Platform et maintenez le contenu clinique à l'intérieur d'une frontière que votre organisation gouverne.",

  // Partnerships page — hero
  Partnerships: "Partenariats",
  "A partnership model for sustainable national access.":
    "Un modèle de partenariat pour un accès national durable.",
  "Robi Care partners with clinics, health programmes, and platform integrators who want documentation support embedded in their own care setting rather than bolted on beside it.":
    "Robi Care s'associe aux cliniques, aux programmes de santé et aux intégrateurs de plateformes qui souhaitent intégrer l'assistance documentaire à leur propre environnement de soins plutôt que de la greffer à côté.",
  "Partnerships begin with the care setting and the governance requirements that apply to it.":
    "Les partenariats commencent par l'environnement de soins et les exigences de gouvernance qui s'y appliquent.",

  // Partnerships page — PPP model
  "Public-Private Partnerships": "Partenariats public-privé",
  "How the model is structured": "Comment le modèle est structuré",
  "Robi Care is deployed through Public-Private Partnerships (PPP) with private enterprise, NGOs and local or national government in each country. Ecocarrier Inc. provides Robi Care, the TMU Enablement Platform and the SAAAS implementation and technical support.":
    "Robi Care est déployé dans le cadre de partenariats public-privé (PPP) avec des entreprises privées, des ONG et les gouvernements locaux ou nationaux de chaque pays. Ecocarrier Inc. fournit Robi Care, la TMU Enablement Platform ainsi que la mise en œuvre et le support technique SAAAS.",
  "Public-Private Partnerships bring government, private enterprise, NGOs and healthcare institutions together around one national deployment.":
    "Les partenariats public-privé réunissent les pouvoirs publics, les entreprises privées, les ONG et les établissements de santé autour d'un même déploiement national.",
  "Participants in the Robi Care Public-Private Partnership model and their roles":
    "Participants au modèle de partenariat public-privé de Robi Care et leurs rôles",
  Participant: "Participant",
  Role: "Rôle",

  // Partnerships page — PPP participants
  "Government or Public Institution": "Gouvernement ou institution publique",
  "Policy alignment, program sponsorship, public-system participation":
    "Alignement des politiques, parrainage des programmes, participation au système public",
  "Local Private Enterprise": "Entreprise privée locale",
  "Operations, adoption, support and commercial execution":
    "Exploitation, adoption, support et exécution commerciale",
  "NGO or Development Partner": "ONG ou partenaire de développement",
  "Community access, program funding, evaluation, capacity building":
    "Accès communautaire, financement des programmes, évaluation, renforcement des capacités",
  "Robi Care, TMU Enablement Platform, SAAAS implementation and technical support":
    "Robi Care, TMU Enablement Platform, mise en œuvre et support technique SAAAS",
  "Healthcare Institutions": "Établissements de santé",
  "Clinical governance, professional oversight and workflow integration":
    "Gouvernance clinique, supervision professionnelle et intégration des flux de travail",

  // Partnerships page — models
  "Partnership models": "Modèles de partenariat",
  "Three ways to work with us": "Trois façons de travailler avec nous",
  "Each model has a different starting point, but they share the same platform, the same governance model, and the same review-first approach to clinical documentation.":
    "Chaque modèle a un point de départ différent, mais tous partagent la même plateforme, le même modèle de gouvernance et la même approche de la documentation clinique fondée sur la vérification préalable.",
  "Clinics and care providers": "Cliniques et prestataires de soins",
  "For clinics": "Pour les cliniques",
  "Adopt Robi Care across a practice or a group of practices, with onboarding that follows your existing clinical governance process.":
    "Adoptez Robi Care au sein d'un cabinet ou d'un groupe de cabinets, avec une intégration qui suit votre processus de gouvernance clinique existant.",
  "Rollout support for multi-site clinical teams":
    "Accompagnement du déploiement pour les équipes cliniques multi-sites",
  "Configuration aligned to your note structure":
    "Configuration alignée sur votre structure de notes",
  "Access administered through your existing accounts":
    "Accès administré via vos comptes existants",
  "Health programmes": "Programmes de santé",
  "For programmes": "Pour les programmes",
  "Embed documentation support into a funded programme or care pathway, with reporting that reflects the outcomes you are accountable for.":
    "Intégrez l'assistance documentaire à un programme financé ou à un parcours de soins, avec un reporting qui reflète les résultats dont vous êtes responsable.",
  "Deployment scoped to a defined care pathway":
    "Déploiement limité à un parcours de soins défini",
  "Programme-level visibility of documentation activity":
    "Visibilité au niveau du programme sur l'activité documentaire",
  "Governance review built into the rollout plan":
    "Revue de gouvernance intégrée au plan de déploiement",
  "Platform integrators": "Intégrateurs de plateformes",
  "For integrators": "Pour les intégrateurs",
  "Build on the TMU · TeleMeetUp Enablement Platform and bring Robi Care capabilities into the systems your customers already run.":
    "Construisez sur la TMU · TeleMeetUp Enablement Platform et intégrez les capacités de Robi Care aux systèmes que vos clients utilisent déjà.",
  "Shared identity and access through the platform":
    "Identité et accès partagés via la plateforme",
  "Integration support from the platform team":
    "Support d'intégration assuré par l'équipe de la plateforme",
  "A single governance model across your product":
    "Un modèle de gouvernance unique pour l'ensemble de votre produit",

  // Partnerships page — building on the platform
  "Building on the platform": "Construire sur la plateforme",
  "What partners build on": "Ce sur quoi les partenaires s'appuient",
  "The TMU · TeleMeetUp Enablement Platform provides the shared foundations, so partners can focus on the clinical capability rather than rebuilding identity, access, and governance for every customer.":
    "La TMU · TeleMeetUp Enablement Platform fournit les fondations partagées, afin que les partenaires puissent se concentrer sur la capacité clinique plutôt que de reconstruire l'identité, l'accès et la gouvernance pour chaque client.",
  "Shared identity and access": "Identité et accès partagés",
  "Partners inherit the TMU · TeleMeetUp account system, so there is no second onboarding flow to build or maintain.":
    "Les partenaires héritent du système de comptes TMU · TeleMeetUp, ce qui évite de créer ou de maintenir un second parcours d'intégration.",
  "One governance model": "Un modèle de gouvernance unique",
  "Deployment, retention, and review policies are defined once at the platform level and apply to every capability built on it.":
    "Les politiques de déploiement, de conservation et de vérification sont définies une seule fois au niveau de la plateforme et s'appliquent à chaque capacité construite sur celle-ci.",
  "Partner support": "Support aux partenaires",
  "A named contact for technical integration questions, plus documentation for the capabilities you are building against.":
    "Un contact dédié pour les questions d'intégration technique, ainsi qu'une documentation sur les capacités que vous utilisez.",

  // Partnerships page — how it starts
  "How it starts": "Comment cela commence",
  "From first conversation to organisation-wide rollout":
    "De la première conversation au déploiement à l'échelle de l'organisation",
  "A partnership follows four stages, each with a review point before the next begins.":
    "Un partenariat suit quatre étapes, chacune comportant un point de vérification avant le début de la suivante.",
  "Scope the partnership": "Définir le périmètre du partenariat",
  "We start with the care setting, the workflow, and the governance requirements that apply to it.":
    "Nous commençons par l'environnement de soins, le flux de travail et les exigences de gouvernance qui s'y appliquent.",
  "Design the integration": "Concevoir l'intégration",
  "Together we map how Robi Care fits your systems, your note structure, and your account administration.":
    "Nous définissons ensemble comment Robi Care s'intègre à vos systèmes, à votre structure de notes et à l'administration de vos comptes.",
  "Pilot with a real team": "Tester avec une équipe réelle",
  "A contained pilot with one clinical team, measured against the documentation burden it removes.":
    "Un pilote limité avec une équipe clinique, évalué à l'aune de la charge documentaire qu'il supprime.",
  "Scale across the organisation": "Déployer à l'échelle de l'organisation",
  "Once the pilot is reviewed, rollout extends across sites, programmes, or customer accounts.":
    "Une fois le pilote évalué, le déploiement s'étend aux sites, aux programmes ou aux comptes clients.",

  // Partnerships page — enquiries
  "Partnership enquiries": "Demandes de partenariat",
  "Tell us about the care setting you want to support":
    "Parlez-nous de l'environnement de soins que vous souhaitez accompagner",
  "Share the setting, the workflow, and the governance requirements that apply. We will come back with a partnership model and a realistic rollout plan.":
    "Décrivez l'environnement, le flux de travail et les exigences de gouvernance applicables. Nous reviendrons vers vous avec un modèle de partenariat et un plan de déploiement réaliste.",
  "Partnership enquiries are handled by the team that supports the platform day to day.":
    "Les demandes de partenariat sont traitées par l'équipe qui assure le support quotidien de la plateforme.",
  "Partner with the TMU · TeleMeetUp Enablement Platform":
    "Devenez partenaire de la TMU · TeleMeetUp Enablement Platform",
  "Bring documentation support into your clinic, programme, or product with a governance model you can review.":
    "Intégrez l'assistance documentaire à votre clinique, votre programme ou votre produit avec un modèle de gouvernance que vous pouvez vérifier.",
  // Sign up — header
  "Create your account": "Créer votre compte",
  "Set up Robi Care": "Configurer Robi Care",
  "Three short steps: tell us who you are, confirm your email address, then review your personal dashboard.":
    "Trois étapes courtes : dites-nous qui vous êtes, confirmez votre adresse e-mail, puis consultez votre tableau de bord personnel.",

  // Sign up — progress steps
  Account: "Compte",
  "Your details": "Vos informations",
  Verification: "Vérification",
  "Confirm your email": "Confirmez votre e-mail",
  Dashboard: "Tableau de bord",
  "Your workspace": "Votre espace de travail",
  "Sign up progress": "Progression de l'inscription",

  // Sign up — step 1 (account details)
  "Step 1 of 3": "Étape 1 sur 3",
  "Account details": "Informations du compte",
  "We use these details to create your Robi Care account and to reach you about your deployment.":
    "Nous utilisons ces informations pour créer votre compte Robi Care et vous contacter au sujet de votre déploiement.",
  "Full Name": "Nom complet",
  "Email Address": "Adresse e-mail",
  "Mobile Phone Number": "Numéro de téléphone mobile",

  // Sign up — step 1 validation messages
  "Please enter your full name.": "Veuillez saisir votre nom complet.",
  "Please enter your mobile phone number.":
    "Veuillez saisir votre numéro de téléphone mobile.",
  "Use digits, spaces, and + ( ) - . only.":
    "Utilisez uniquement des chiffres, des espaces et les caractères + ( ) - .",
  "Please enter a plausible phone number.":
    "Veuillez saisir un numéro de téléphone plausible.",

  // Sign up — step 2 (verification)
  "Step 2 of 3": "Étape 2 sur 3",
  "Verify your email": "Vérifiez votre e-mail",
  "Enter the verification code we sent to your email address to confirm it belongs to you.":
    "Saisissez le code de vérification que nous avons envoyé à votre adresse e-mail pour confirmer qu'elle vous appartient.",
  "As part of standard account security procedures, identity information may be verified before your account is activated (KYC/AML).":
    "Dans le cadre des procédures de sécurité standard des comptes, les informations d'identité peuvent être vérifiées avant l'activation de votre compte (KYC/AML).",
  "Sent to": "Envoyé à",
  "Verification code": "Code de vérification",
  "Enter the 4–6 digit code from your email.":
    "Saisissez le code à 4–6 chiffres reçu par e-mail.",

  // Sign up — step 3 (personal dashboard)
  "Step 3 of 3": "Étape 3 sur 3",
  "Your personal dashboard": "Votre tableau de bord personnel",
  "Tell us how you work, then review a preview of your usage and billing.":
    "Dites-nous comment vous travaillez, puis consultez un aperçu de votre utilisation et de votre facturation.",
  "Personal information": "Informations personnelles",
  "This helps us tailor Robi Care to your clinical setting. Values are kept while you remain on this page.":
    "Cela nous aide à adapter Robi Care à votre environnement clinique. Les valeurs sont conservées tant que vous restez sur cette page.",
  "Usage Summary": "Récapitulatif de l'utilisation",
  "This is a preview with example data. Your real usage and billing figures will appear here once your account is linked to the TMU Enablement Platform.":
    "Ceci est un aperçu avec des données d'exemple. Vos chiffres réels d'utilisation et de facturation apparaîtront ici une fois votre compte lié à la TMU Enablement Platform.",
  "Current Billing Period Cost": "Coût de la période de facturation en cours",
  "Account & Invoice History": "Historique du compte et des factures",
  "Your usage and billing details will update automatically once your account is linked to the TMU Enablement Platform.":
    "Les détails de votre utilisation et de votre facturation seront mis à jour automatiquement une fois votre compte lié à la TMU Enablement Platform.",
  "Professional role / specialty": "Rôle professionnel / spécialité",
  "e.g. Emergency Physician": "ex. Médecin urgentiste",
  "Organization / practice name": "Nom de l'organisation / du cabinet",
  "e.g. Northshore Family Practice":
    "ex. Cabinet de médecine familiale Northshore",

  // Sign up — dashboard usage metrics
  "Clinical encounters captured": "Rencontres cliniques saisies",
  "Across the current billing period": "Sur la période de facturation en cours",
  "Structured notes generated": "Notes structurées générées",
  "Prepared for clinician review":
    "Préparées pour vérification par le clinicien",
  "Documentation time saved": "Temps de documentation économisé",
  "Estimated against manual entry": "Estimé par rapport à la saisie manuelle",
  "Active clinician seats": "Postes de cliniciens actifs",
  "Of 10 provisioned seats": "Sur 10 postes provisionnés",

  // Sign up — billing summary
  Estimated: "Estimé",
  "Clinician seats (6 × $65.00)": "Postes de cliniciens (6 × $65.00)",
  "Usage overage": "Dépassement d'utilisation",
  "Platform enablement fee": "Frais d'activation de la plateforme",
  "Estimated total": "Total estimé",

  // Sign up — invoice table
  Invoice: "Facture",
  Period: "Période",
  Issued: "Émise le",
  Amount: "Montant",
  Status: "Statut",
  Paid: "Payée",
  Pending: "En attente",

  // Sign up — professional role options
  Physician: "Médecin",
  Nurse: "Infirmier",
  "Nurse Practitioner": "Infirmier praticien",
  "Emergency Physician": "Médecin urgentiste",
  "Paramedic / EMS": "Paramédical / services médicaux d'urgence",
  "Clinic Administrator": "Administrateur de clinique",
  "Hospital Administrator": "Administrateur d'hôpital",
  "Clinical Informaticist": "Informaticien clinique",
  Other: "Autre",

  // Keyboard Liberation — hero
  "Keyboard liberation": "Keyboard Liberation",
  "Clinicians should work by speaking, not typing":
    "Les cliniciens devraient travailler en parlant, non en tapant",
  "Robi Care captures the consultation as speech and prepares a structured note from it — so the clinician's attention stays on the patient, and the keyboard stops standing between them.":
    "Robi Care recueille la consultation sous forme de parole et en prépare une note structurée — ainsi l'attention du clinicien reste sur le patient, et le clavier cesse de s'interposer entre eux.",
  "The consultation stays a conversation. Capture happens in the background while the clinician remains present with the patient.":
    "La consultation reste une conversation. La saisie s'effectue en arrière-plan pendant que le clinicien reste présent auprès du patient.",

  // Keyboard Liberation — intro
  "Let clinicians face patients again.":
    "Redonnez aux cliniciens la possibilité de faire face aux patients.",
  "Clinical documentation is indispensable, but the keyboard should not stand between a healthcare professional and the person seeking care. Robi Care uses consent-based, AI-assisted, multilingual voice documentation to transform authorized clinical conversations into reviewable drafts, summaries and structured records — just speak to it in your own language. The clinician remains responsible for verifying, correcting and approving the resulting clinical documentation — this human sign-off is a safety control, not an inconvenience.":
    "La documentation clinique est indispensable, mais le clavier ne devrait pas s'interposer entre un professionnel de santé et la personne qui sollicite des soins. Robi Care utilise une documentation vocale multilingue, assistée par IA et fondée sur le consentement, pour transformer des conversations cliniques autorisées en brouillons vérifiables, en résumés et en dossiers structurés — il suffit de lui parler dans votre propre langue. Le clinicien reste responsable de vérifier, de corriger et d'approuver la documentation clinique qui en résulte — cette validation humaine est un dispositif de sécurité, non une contrainte.",
  "A consultation without a keyboard in the room: the clinician's attention stays with the person seeking care.":
    "Une consultation sans clavier dans la pièce : l'attention du clinicien reste tournée vers la personne qui sollicite des soins.",

  // Keyboard Liberation — workflow
  "The workflow": "Le flux de travail",
  "Seven steps from consent to authorized record":
    "Sept étapes, du consentement au dossier autorisé",
  "Each step is governed and reviewable. The clinician approves or corrects the draft before anything becomes part of the record.":
    "Chaque étape est gouvernée et vérifiable. Le clinicien approuve ou corrige le brouillon avant que quoi que ce soit n'intègre le dossier.",
  "This approach reflects the broader case made by Dr. Eric Topol for AI-assisted, ambient clinical documentation that frees physicians to focus on patients rather than data entry. Robi Care applies this thinking within a governed, consent-based workflow. This page does not imply that Dr. Topol endorses Robi Care.":
    "Cette approche reflète l'argument plus large avancé par le Dr Eric Topol en faveur d'une documentation clinique ambiante assistée par IA, qui libère les médecins pour qu'ils se concentrent sur les patients plutôt que sur la saisie de données. Robi Care applique cette réflexion dans un flux de travail gouverné et fondé sur le consentement. Cette page n'implique pas que le Dr Topol approuve Robi Care.",

  // Keyboard Liberation — problem / before-after
  "The problem": "Le problème",
  "Documentation has quietly become the second job":
    "La documentation est devenue discrètement un second métier",
  "Clinical time is finite. When a keyboard sits between the clinician and the patient, both the conversation and the record pay for it.":
    "Le temps clinique est limité. Lorsqu'un clavier s'interpose entre le clinicien et le patient, la conversation comme le dossier en subissent les conséquences.",
  Before: "Avant",
  After: "Après",
  "Keyboard-bound documentation": "Documentation liée au clavier",
  "Speech-driven documentation": "Documentation guidée par la parole",
  "Eyes on the screen": "Les yeux sur l'écran",
  "The clinician types while the patient talks, splitting attention between the person in the room and the form on the display.":
    "Le clinicien tape pendant que le patient parle, partageant son attention entre la personne présente dans la pièce et le formulaire affiché à l'écran.",
  "Notes written after the fact": "Des notes rédigées après coup",
  "Documentation is reconstructed from memory at the end of the day, when the detail of the conversation has already faded.":
    "La documentation est reconstituée de mémoire en fin de journée, lorsque le détail de la conversation s'est déjà estompé.",
  "Repetitive strain":
    "Troubles musculosquelettiques liés aux gestes répétitifs",
  "Hours of keyboard work accumulate into wrist, neck, and shoulder strain that follows the clinician out of the room.":
    "Des heures de travail au clavier s'accumulent en tensions du poignet, de la nuque et de l'épaule qui suivent le clinicien hors de la salle.",
  "Inconsistent structure": "Une structure incohérente",
  "Every clinician formats notes differently, so the record is hard to scan and harder to hand over.":
    "Chaque clinicien met en forme ses notes différemment, ce qui rend le dossier difficile à parcourir et plus difficile encore à transmettre.",
  "Eyes on the patient": "Les yeux sur le patient",
  "The consultation stays a conversation. Speech is captured in the background while the clinician remains present.":
    "La consultation reste une conversation. La parole est recueillie en arrière-plan pendant que le clinicien reste présent.",
  "Notes drafted in the moment": "Des notes rédigées sur le moment",
  "The conversation is turned into a structured draft while the detail is still fresh, ready for review before the next patient.":
    "La conversation est transformée en un brouillon structuré tant que le détail est encore frais, prêt à être vérifié avant le patient suivant.",
  "Voice instead of keystrokes": "La voix plutôt que les frappes",
  "The keyboard stops being the bottleneck. Clinicians work by speaking, the way they already work with patients.":
    "Le clavier cesse d'être le goulot d'étranglement. Les cliniciens travaillent en parlant, comme ils travaillent déjà avec les patients.",
  "One consistent structure": "Une structure cohérente unique",
  "Every note follows the same reviewed template, so records are predictable to read and straightforward to hand over.":
    "Chaque note suit le même modèle vérifié, de sorte que les dossiers sont prévisibles à lire et simples à transmettre.",

  // Keyboard Liberation — how it works steps
  "How it works": "Comment cela fonctionne",
  "From spoken consultation to reviewed note":
    "De la consultation parlée à la note vérifiée",
  "Four steps, in the order a clinician already works. Capture and structure are automatic; review and record stay with the clinician.":
    "Quatre étapes, dans l'ordre selon lequel un clinicien travaille déjà. La saisie et la structuration sont automatiques ; la vérification et l'enregistrement restent au clinicien.",
  Step: "Étape",
  Capture: "Recueillir",
  "With the patient's knowledge, the consultation is captured as speech. No typing, no screen between clinician and patient.":
    "Avec l'accord du patient, la consultation est recueillie sous forme de parole. Aucune frappe, aucun écran entre le clinicien et le patient.",
  Structure: "Structurer",
  "The captured conversation is organised into a structured clinical note — history, findings, plan — following the clinic's template.":
    "La conversation recueillie est organisée en une note clinique structurée — antécédents, observations, plan — selon le modèle de la clinique.",
  Review: "Vérifier",
  "The clinician reads the draft, corrects anything that needs correcting, and approves it. Nothing is filed before that review.":
    "Le clinicien lit le brouillon, corrige ce qui doit l'être et l'approuve. Rien n'est classé avant cette vérification.",
  Record: "Enregistrer",
  "Only the approved note is committed to the record, with the clinician's decision recorded alongside it.":
    "Seule la note approuvée est versée au dossier, la décision du clinicien étant consignée à côté.",

  // Keyboard Liberation — proof points
  "Proof points": "Points de preuve",
  "What changes when the keyboard steps aside":
    "Ce qui change lorsque le clavier s'efface",
  "The gains are practical rather than dramatic: more attention in the room, a note that is already drafted, and a record that reads the same way every time.":
    "Les gains sont pratiques plutôt que spectaculaires : plus d'attention dans la pièce, une note déjà rédigée et un dossier qui se lit de la même manière à chaque fois.",
  "Hands free": "Mains libres",
  "Documentation without a keyboard": "Une documentation sans clavier",
  "The clinician's hands and attention stay with the patient rather than the input device.":
    "Les mains et l'attention du clinicien restent avec le patient plutôt qu'avec le dispositif de saisie.",
  "Review first": "Vérification d'abord",
  "Every note approved before use": "Chaque note approuvée avant utilisation",
  "Generated output is a draft until a clinician reads and approves it. The clinician remains the decision-maker.":
    "Le résultat généré reste un brouillon tant qu'un clinicien ne l'a pas lu et approuvé. Le clinicien demeure le décideur.",
  "One template": "Un seul modèle",
  "Consistent structure across the clinic":
    "Une structure cohérente dans toute la clinique",
  "Notes follow the same reviewed layout, which makes handover and audit straightforward.":
    "Les notes suivent la même mise en page vérifiée, ce qui facilite la transmission et l'audit.",
  "Speech-driven capture is a workflow change, not a new way of practising medicine — the clinician still leads the consultation.":
    "La saisie guidée par la parole est un changement de flux de travail, non une nouvelle façon d'exercer la médecine — le clinicien continue de mener la consultation.",

  // Keyboard Liberation — closing call to action
  "Give your clinicians their attention back":
    "Rendez à vos cliniciens leur attention",
  "See how speech-driven capture and review-before-use documentation fit the way your clinic already works.":
    "Découvrez comment la saisie guidée par la parole et la documentation vérifiée avant utilisation s'intègrent à la façon dont votre clinique travaille déjà.",

  // TMU-KL service section
  "TMU-KL service": "Service TMU-KL",
  "A speech-driven documentation service built with Toronto Metropolitan University's Knowledge Lab. Watch the walkthrough, then see what it changes for the clinician in the room.":
    "Un service de documentation guidé par la parole, conçu avec le Knowledge Lab de l'Université métropolitaine de Toronto. Regardez la démonstration, puis découvrez ce qu'elle change pour le clinicien dans la pièce.",
  "TMU-KL Keyboard Liberation Service — speech-driven clinical documentation walkthrough":
    "TMU-KL Keyboard Liberation Service — démonstration de la documentation clinique guidée par la parole",
  "Video thumbnail: a clinician speaking with a patient while a structured clinical note is drafted on screen beside them.":
    "Vignette vidéo : un clinicien s'entretient avec un patient pendant qu'une note clinique structurée se rédige à l'écran à côté d'eux.",
  "Play video:": "Lire la vidéo :",
  "The walkthrough plays inline on this page. Nothing is loaded from YouTube until you press play.":
    "La démonstration se lit directement sur cette page. Rien n'est chargé depuis YouTube tant que vous n'appuyez pas sur lecture.",
  "What it changes": "Ce que cela change",
  "Four gains for the clinician": "Quatre bénéfices pour le clinicien",
  "Capture by speaking": "Recueillir en parlant",
  "Patient encounter details are captured naturally through speech instead of typing, so the clinician stays in the conversation.":
    "Les détails de la rencontre avec le patient sont recueillis naturellement par la parole plutôt que par la frappe, de sorte que le clinicien reste dans la conversation.",
  "Structure automatically": "Structurer automatiquement",
  "The captured encounter is automatically structured and organised into clinical documentation that follows the clinic's template.":
    "La rencontre recueillie est automatiquement structurée et organisée en une documentation clinique qui suit le modèle de la clinique.",
  "Draft the follow-up work": "Préparer le travail de suivi",
  "Draft notes, orders, and follow-up scheduling are prepared for clinician review, ready to be checked rather than written from scratch.":
    "Les notes en brouillon, les prescriptions et la planification du suivi sont préparés pour la vérification du clinicien, prêts à être contrôlés plutôt qu'à rédiger de zéro.",
  "Less administration": "Moins d'administration",
  "Administrative burden drops, so clinicians spend more of their time with patients and less of it at a keyboard.":
    "La charge administrative diminue, de sorte que les cliniciens consacrent plus de temps aux patients et moins au clavier.",
  "AI may assist. The clinician decides.":
    "L'IA peut assister. Le clinicien décide.",
  "The service assists with documentation and drafting only. It does not diagnose, prescribe, or act. A qualified clinician reviews and approves all clinical content before it is used, and nothing generated reaches the patient record without that sign-off.":
    "Le service assiste uniquement la documentation et la rédaction. Il ne pose pas de diagnostic, ne prescrit pas et n'agit pas. Un clinicien qualifié vérifie et approuve tout contenu clinique avant son utilisation, et rien de ce qui est généré n'atteint le dossier du patient sans cette validation.",

  // Keyboard Liberation — workflow diagram steps
  "Patient Consent": "Consentement du patient",
  "Clinical Encounter": "Rencontre clinique",
  "Secure Transcription": "Transcription sécurisée",
  "Structured Draft": "Brouillon structuré",
  "Clinician Review": "Vérification par le clinicien",
  "Approve or Correct": "Approuver ou corriger",
  "Authorized Record": "Dossier autorisé",

  // Healthcare and clinical disclaimer — hero
  "Healthcare and clinical disclaimer": "Avertissement médical et clinique",
  "Clinical safety boundaries, stated plainly":
    "Les limites de sécurité clinique, énoncées clairement",
  "Robi Care is an AI-assisted documentation and communication aid for healthcare professionals. It prepares information for professional review; it does not replace clinical judgment, and it is not an emergency service.":
    "Robi Care est une aide à la documentation et à la communication assistée par IA destinée aux professionnels de santé. Il prépare l'information pour un examen professionnel ; il ne remplace pas le jugement clinique et n'est pas un service d'urgence.",
  "The clinician remains responsible for every clinical decision and for verifying, correcting, and approving all clinical documentation before it is used.":
    "Le clinicien reste responsable de chaque décision clinique et de la vérification, de la correction et de l'approbation de toute la documentation clinique avant son utilisation.",

  // Healthcare and clinical disclaimer — section
  "What Robi Care is, and what it is not":
    "Ce que Robi Care est, et ce qu'il n'est pas",
  "These statements describe the clinical safety boundaries of the service. They apply to every deployment of Robi Care on the TMU · TeleMeetUp Enablement Platform.":
    "Ces déclarations décrivent les limites de sécurité clinique du service. Elles s'appliquent à chaque déploiement de Robi Care sur la TMU · TeleMeetUp Enablement Platform.",

  // Healthcare and clinical disclaimer — points
  "The clinician decides": "Le clinicien décide",
  "Robi Care prepares information for professional review. It does not diagnose, prescribe, or act, and it does not replace clinical judgment. A qualified clinician reviews and approves all clinical content before it is used.":
    "Robi Care prépare l'information pour un examen professionnel. Il ne pose pas de diagnostic, ne prescrit pas et n'agit pas, et il ne remplace pas le jugement clinique. Un clinicien qualifié vérifie et approuve tout contenu clinique avant son utilisation.",
  "Every generated note is a draft until a clinician reviews and approves it. Nothing generated reaches the patient record without that explicit human sign-off.":
    "Chaque note générée reste un brouillon tant qu'un clinicien ne l'a pas vérifiée et approuvée. Rien de ce qui est généré n'atteint le dossier du patient sans cette validation humaine explicite.",
  "Not a medical device": "Dispositif non médical",
  "Robi Care is a documentation and communication aid. It is not a medical device and is not intended to diagnose, treat, cure, or prevent any disease or condition.":
    "Robi Care est une aide à la documentation et à la communication. Il ne s'agit pas d'un dispositif médical et il n'est pas destiné à diagnostiquer, traiter, guérir ou prévenir une maladie ou une affection.",
  "Not an emergency service": "Service non destiné aux urgences",
  "Robi Care is not an emergency service. In an emergency, contact the applicable local emergency service immediately.":
    "Robi Care n'est pas un service d'urgence. En cas d'urgence, contactez immédiatement le service d'urgence local compétent.",

  // Healthcare and clinical disclaimer — clinician responsibility
  "Clinician responsibility": "Responsabilité du clinicien",
  "The clinician remains the decision-maker": "Le clinicien reste le décideur",
  "Robi Care assists with documentation and drafting only. It does not diagnose, prescribe, or act. A qualified clinician reviews and approves all clinical content before it is used, and nothing generated reaches the patient record without that sign-off.":
    "Robi Care assiste uniquement la documentation et la rédaction. Il ne pose pas de diagnostic, ne prescrit pas et n'agit pas. Un clinicien qualifié vérifie et approuve tout contenu clinique avant son utilisation, et rien de ce qui est généré n'atteint le dossier du patient sans cette validation.",

  // Healthcare and clinical disclaimer — closing call to action
  "Review the clinical safety model with us":
    "Examinez le modèle de sécurité clinique avec nous",
  "Talk to the team about how review-before-use, clinician control, and data handling would work in your clinic.":
    "Parlez à l'équipe de la manière dont la vérification avant utilisation, le contrôle par le clinicien et le traitement des données fonctionneraient dans votre clinique.",

  // Cookie Notice — hero
  "Cookie Notice": "Avis relatif aux cookies",
  "How this site uses cookies": "Comment ce site utilise les cookies",
  "This notice explains what cookies are, which cookies this site uses, and how you can manage them. It applies to the Robi Care website and is available in both languages.":
    "Cet avis explique ce que sont les cookies, quels cookies ce site utilise et comment vous pouvez les gérer. Il s'applique au site Robi Care et est disponible dans les deux langues.",
  "We use cookies to keep the site secure, remember your language preference, and understand how the site is used.":
    "Nous utilisons des cookies pour assurer la sécurité du site, mémoriser votre préférence de langue et comprendre comment le site est utilisé.",

  // Cookie Notice — categories
  "What we use": "Ce que nous utilisons",
  "The cookies this site uses": "Les cookies utilisés par ce site",
  "Cookies are small text files stored on your device. We group them by purpose so you can see exactly what each one does.":
    "Les cookies sont de petits fichiers texte stockés sur votre appareil. Nous les regroupons par finalité afin que vous puissiez voir exactement ce que fait chacun d'eux.",
  "Strictly necessary cookies": "Cookies strictement nécessaires",
  "These cookies are required for the site to function, including security, session management, and remembering your language preference. They cannot be switched off.":
    "Ces cookies sont nécessaires au fonctionnement du site, notamment pour la sécurité, la gestion de session et la mémorisation de votre préférence de langue. Ils ne peuvent pas être désactivés.",
  "Preference cookies": "Cookies de préférences",
  "These cookies remember choices you make, such as your selected language, so the site behaves consistently on your return visits.":
    "Ces cookies mémorisent les choix que vous effectuez, comme la langue sélectionnée, afin que le site se comporte de manière cohérente lors de vos visites ultérieures.",
  "Analytics cookies": "Cookies de mesure d'audience",
  "These cookies help us understand how the site is used so we can improve it. They are only set where analytics is enabled for the deployment.":
    "Ces cookies nous aident à comprendre comment le site est utilisé afin de l'améliorer. Ils ne sont déposés que lorsque la mesure d'audience est activée pour le déploiement.",

  // Cookie Notice — managing cookies
  "Managing cookies": "Gérer les cookies",
  "You are in control of your cookies":
    "Vous gardez la maîtrise de vos cookies",
  "You can manage or delete cookies through your browser settings at any time. Blocking strictly necessary cookies may affect how the site works.":
    "Vous pouvez gérer ou supprimer les cookies à tout moment via les paramètres de votre navigateur. Le blocage des cookies strictement nécessaires peut affecter le fonctionnement du site.",
  "Browser settings": "Paramètres du navigateur",
  "Most browsers let you view, manage, and delete cookies. The exact steps depend on your browser and are described in its help pages.":
    "La plupart des navigateurs vous permettent de consulter, de gérer et de supprimer les cookies. Les étapes exactes dépendent de votre navigateur et sont décrites dans ses pages d'aide.",
  "Language preference": "Préférence de langue",
  "Your language choice is stored so the site opens in the language you selected on your return visits. Clearing cookies resets it to English.":
    "Votre choix de langue est conservé afin que le site s'ouvre dans la langue que vous avez sélectionnée lors de vos visites ultérieures. La suppression des cookies le réinitialise en anglais.",
  "Questions about this notice": "Questions sur cet avis",
  "If you have questions about how this site uses cookies, contact the Robi Care team at hello@tmu.ai.":
    "Si vous avez des questions sur l'utilisation des cookies par ce site, contactez l'équipe Robi Care à hello@tmu.ai.",

  // Cookie Notice — closing call to action
  "Questions about privacy and data handling?":
    "Des questions sur la confidentialité et le traitement des données ?",
  "Talk to the team about how cookies, data handling, and clinical governance work in your deployment.":
    "Parlez à l'équipe de la manière dont les cookies, le traitement des données et la gouvernance clinique fonctionnent dans votre déploiement.",
};

/** Resolve a source string for the active language. */
export function translate(language: Language, key: string): string {
  if (language === "en") return key;
  return FRENCH[key] ?? key;
}
