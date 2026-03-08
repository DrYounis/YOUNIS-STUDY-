'use client';
import { useState } from 'react';

const questions = [
  {
    id: 1,
    question: "🌟 How are you feeling today?",
    options: [
      { text: "Super excited! 🎉", type: "energetic" },
      { text: "Pretty good! 😊", type: "positive" },
      { text: "Just okay... 😐", type: "neutral" },
      { text: "A bit tired 😴", type: "calm" },
    ]
  },
  {
    id: 2,
    question: "🎮 What sounds most fun right now?",
    options: [
      { text: "Playing active games! ⚽", type: "energetic" },
      { text: "Creating something cool 🎨", type: "creative" },
      { text: "Reading or learning 📚", type: "thoughtful" },
      { text: "Relaxing and chilling 😌", type: "calm" },
    ]
  },
  {
    id: 3,
    question: "👫 Who do you want to spend time with?",
    options: [
      { text: "Lots of friends! 🎊", type: "social" },
      { text: "One best friend 👫", type: "social" },
      { text: "My family 👨‍👩‍👧‍👦", type: "family" },
      { text: "Just me time 🧘", type: "alone" },
    ]
  },
  {
    id: 4,
    question: "🌈 What's your favorite kind of adventure?",
    options: [
      { text: "Exploring outside! 🌳", type: "outdoor" },
      { text: "Building forts at home 🏰", type: "creative" },
      { text: "Playing games 🎯", type: "energetic" },
      { text: "Watching movies 🎬", type: "calm" },
    ]
  },
  {
    id: 5,
    question: "💡 When you have a problem, you usually...",
    options: [
      { text: "Ask for help! 🙋", type: "social" },
      { text: "Think about it 🤔", type: "thoughtful" },
      { text: "Try different things 🔧", type: "creative" },
      { text: "Take a break first 😌", type: "calm" },
    ]
  },
  {
    id: 6,
    question: "🎵 What makes you happiest?",
    options: [
      { text: "Dancing and singing! 💃", type: "energetic" },
      { text: "Drawing or crafting 🖼️", type: "creative" },
      { text: "Solving puzzles 🧩", type: "thoughtful" },
      { text: "Listening to calm music 🎶", type: "calm" },
    ]
  },
];

const activities = {
  energetic: [
    "🏃 Do 10 jumping jacks and dance to your favorite song!",
    "⚽ Play a quick game of catch or kick a ball around!",
    "🎮 Have a mini dance party in your room!",
    "🚴 Go for a bike ride or run around the yard!",
  ],
  positive: [
    "😊 Write down 3 things you're grateful for today!",
    "🌟 Tell someone something nice about them!",
    "📸 Take a happy selfie and smile big!",
    "🎨 Draw a picture of what makes you happy!",
  ],
  neutral: [
    "🌈 Take 5 deep breaths and think of your favorite color!",
    "📚 Read a few pages of a fun book!",
    "🎵 Listen to a song you love!",
    "🧩 Do a small puzzle or brain teaser!",
  ],
  calm: [
    "😌 Lie down and rest for 10 minutes!",
    "🛁 Take a relaxing bath or shower!",
    "📖 Read a cozy story in your favorite spot!",
    "🎧 Listen to calming music with your eyes closed!",
  ],
  creative: [
    "🎨 Draw or paint something imaginary!",
    "🏗️ Build a fort with blankets and pillows!",
    "✂️ Make a craft with paper, scissors, and glue!",
    "📝 Write a short story or poem!",
  ],
  thoughtful: [
    "🤔 Think about what made you smile this week!",
    "📚 Learn a fun fact about animals or space!",
    "🧠 Solve a riddle or math puzzle!",
    "📝 Write in a journal about your day!",
  ],
  social: [
    "👋 Call or text a friend to say hi!",
    "🎲 Play a board game with someone!",
    "💬 Share a joke with your family!",
    "🤗 Give someone a hug!",
  ],
  family: [
    "👨‍👩‍👧‍👦 Ask your family to play a game together!",
    "🍪 Help make a snack or meal!",
    "📺 Watch a movie with your family!",
    "🎤 Have a family sing-along!",
  ],
  alone: [
    "🧘 Sit quietly and think about your dreams!",
    "📖 Read your favorite book alone!",
    "🎨 Do a solo art project!",
    "🎮 Play your favorite solo game!",
  ],
  outdoor: [
    "🌳 Go for a nature walk!",
    "🦋 Look for bugs or birds outside!",
    "⚽ Play outside in the fresh air!",
    "🌻 Pick flowers or look at clouds!",
  ],
};

const personalities = {
  energetic: {
    name: "Energy Star ⭐",
    description: "You're full of energy and love to move around!",
    color: "#FF6B6B",
  },
  positive: {
    name: "Happy Sun ☀️",
    description: "You spread joy and positivity everywhere!",
    color: "#FFD93D",
  },
  neutral: {
    name: "Cool Breeze 🍃",
    description: "You're balanced and take things as they come!",
    color: "#6BCB77",
  },
  calm: {
    name: "Peaceful Moon 🌙",
    description: "You love quiet time and relaxing moments!",
    color: "#4D96FF",
  },
  creative: {
    name: "Art Master 🎨",
    description: "You're super creative and love making things!",
    color: "#FF85D4",
  },
  thoughtful: {
    name: "Wise Owl 🦉",
    description: "You think deeply and love learning!",
    color: "#9D5CFF",
  },
  social: {
    name: "Friend Champion 🏆",
    description: "You love being around people and making friends!",
    color: "#FF8C42",
  },
  family: {
    name: "Family Hero 💝",
    description: "Your family is super important to you!",
    color: "#FF6B9D",
  },
  alone: {
    name: "Independent Explorer 🗺️",
    description: "You enjoy your own company and self-discovery!",
    color: "#4ECDC4",
  },
  outdoor: {
    name: "Nature Adventurer 🌲",
    description: "You love exploring the great outdoors!",
    color: "#2D6A4F",
  },
};

export default function FriendsQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);
  const [hoveredOption, setHoveredOption] = useState(null);

  const handleAnswer = (type) => {
    const newAnswers = [...answers, type];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers) => {
    const counts = {};
    finalAnswers.forEach((type) => {
      counts[type] = (counts[type] || 0) + 1;
    });

    const topType = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
    const secondType = Object.entries(counts).sort((a, b) => b[1] - a[1])[1]?.[0];

    const primaryActivity = activities[topType];
    const secondaryActivity = secondType ? activities[secondType] : [];
    const allActivities = [...primaryActivity, ...secondaryActivity].sort(() => Math.random() - Math.random()).slice(0, 3);

    setResult({
      personality: personalities[topType],
      activities: allActivities,
      message: "Here are some fun things you can do today!",
    });
    setShowResult(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setResult(null);
  };

  const styles = {
    container: {
      minHeight: '100vh',
      padding: '2rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    card: {
      background: 'white',
      borderRadius: '2rem',
      padding: '3rem',
      maxWidth: '600px',
      width: '100%',
      boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      textAlign: 'center',
    },
    header: {
      marginBottom: '2rem',
    },
    title: {
      fontSize: '2.5rem',
      color: '#667eea',
      marginBottom: '0.5rem',
    },
    subtitle: {
      fontSize: '1.2rem',
      color: '#666',
    },
    progress: {
      display: 'flex',
      gap: '0.5rem',
      marginBottom: '2rem',
      justifyContent: 'center',
    },
    progressDot: (active, completed) => ({
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      background: completed ? '#667eea' : active ? '#667eea' : '#ddd',
      transition: 'all 0.3s ease',
    }),
    question: {
      fontSize: '1.5rem',
      color: '#333',
      marginBottom: '2rem',
      fontWeight: '600',
    },
    options: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    },
    option: (index) => ({
      padding: '1.25rem',
      borderRadius: '1rem',
      border: '3px solid #e0e0e0',
      background: 'white',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '1.1rem',
      fontWeight: '500',
      color: '#333',
      transform: `translateY(0)`,
      animation: `slideUp 0.5s ease ${index * 0.1}s both`,
    }),
    optionHover: {
      borderColor: '#667eea',
      background: '#f0f4ff',
      transform: 'translateY(-3px)',
      boxShadow: '0 5px 15px rgba(102, 126, 234, 0.3)',
    },
    resultCard: {
      animation: 'fadeIn 0.8s ease',
    },
    personalityName: {
      fontSize: '2rem',
      marginBottom: '1rem',
    },
    personalityDesc: {
      fontSize: '1.2rem',
      color: '#666',
      marginBottom: '2rem',
    },
    activitiesList: {
      textAlign: 'left',
      background: '#f8f9ff',
      padding: '2rem',
      borderRadius: '1rem',
      marginBottom: '2rem',
    },
    activityItem: {
      padding: '0.75rem 0',
      borderBottom: '1px solid #e0e0e0',
      fontSize: '1.1rem',
      color: '#333',
    },
    button: {
      padding: '1rem 2rem',
      fontSize: '1.1rem',
      borderRadius: '2rem',
      border: 'none',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      cursor: 'pointer',
      fontWeight: '600',
      transition: 'all 0.3s ease',
    },
  };

  return (
    <div style={styles.container}>
      <style jsx global>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>

      <div style={styles.card}>
        {!showResult ? (
          <>
            <div style={styles.header}>
              <h1 style={styles.title}>🎯 Fun Quiz for Younis's Friends!</h1>
              <p style={styles.subtitle}>Answer these questions to discover your perfect day!</p>
            </div>

            <div style={styles.progress}>
              {questions.map((_, index) => (
                <div
                  key={index}
                  style={styles.progressDot(index === currentQuestion, index < currentQuestion)}
                />
              ))}
            </div>

            <div style={styles.question}>
              {questions[currentQuestion].question}
            </div>

            <div style={styles.options}>
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option.type)}
                  onMouseEnter={() => setHoveredOption(index)}
                  onMouseLeave={() => setHoveredOption(null)}
                  style={{
                    ...styles.option(index),
                    ...(hoveredOption === index ? styles.optionHover : {}),
                  }}
                >
                  {option.text}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div style={styles.resultCard}>
            <div
              style={{
                ...styles.personalityName,
                color: result.personality.color,
              }}
            >
              {result.personality.name}
            </div>
            <p style={styles.personalityDesc}>{result.personality.description}</p>

            <h2 style={{ marginBottom: '1rem', color: '#667eea' }}>
              📋 Your Fun Activities for Today:
            </h2>
            <div style={styles.activitiesList}>
              {result.activities.map((activity, index) => (
                <div key={index} style={styles.activityItem}>
                  {activity}
                </div>
              ))}
            </div>

            <button
              onClick={resetQuiz}
              style={styles.button}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              🔄 Take Quiz Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
