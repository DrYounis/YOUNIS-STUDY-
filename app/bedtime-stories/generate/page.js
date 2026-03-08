'use client';
import { useState } from 'react';

export default function StoryGenerator() {
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('');
  const [storyConcept, setStoryConcept] = useState('');
  const [generating, setGenerating] = useState(false);
  const [story, setStory] = useState(null);
  const [error, setError] = useState('');

  const handleGenerate = async (e) => {
    e.preventDefault();
    
    if (!childName || !childAge || !storyConcept) {
      setError('Please fill in all fields');
      return;
    }

    setError('');
    setGenerating(true);
    setStory(null);

    try {
      const storyData = await generateStory(childName, parseInt(childAge), storyConcept);

      const savedStories = JSON.parse(localStorage.getItem('bedtimeStories') || '[]');
      const newStory = {
        id: Date.now().toString(),
        childName,
        childAge: parseInt(childAge),
        storyConcept,
        title: storyData.title,
        content: storyData.content,
        createdAt: new Date().toISOString(),
      };
      savedStories.unshift(newStory);
      localStorage.setItem('bedtimeStories', JSON.stringify(savedStories));

      setStory(storyData);
    } catch (err) {
      setError('Something went wrong. Please try again!');
      console.error(err);
    } finally {
      setGenerating(false);
    }
  };

  const generateStory = async (name, age, concept) => {
    await new Promise(resolve => setTimeout(resolve, 1500));

    const templates = [
      {
        title: `🌟 ${name}'s Magical ${concept.charAt(0).toUpperCase() + concept.slice(1)} Adventure`,
        content: `Once upon a time, in a cozy little house just like yours, lived a brave ${age}-year-old adventurer named ${name}. 🏠✨

One peaceful evening, ${name} discovered something magical about: ${concept}. It was like finding a secret treasure! 💎

${name} closed their eyes and imagined floating on a fluffy cloud ☁️, drifting through a sky filled with twinkling stars ⭐. Each star whispered kind words: "You are brave, ${name}!" "You are kind!" "You are special!"

As ${name} journeyed through this dreamy land, they met friendly characters who loved ${concept} just as much as they did! Together, they learned that the most magical thing in the whole universe was... believing in yourself! 🌈

The moon smiled down and sang a gentle lullaby 🌙🎵. ${name} felt warm, safe, and so very sleepy...

And as ${name}'s eyes grew heavy, they knew that tomorrow would bring new adventures. But for now, it was time to rest and dream sweet dreams. 💤

Goodnight, brave ${name}. The end. 🌟`
      },
      {
        title: `✨ ${name} and the Wonderful World of ${concept.charAt(0).toUpperCase() + concept.slice(1)}`,
        content: `In a land far, far away (but also right in your imagination!), there lived a wonderful child named ${name}. ${name} was ${age} years old and had the biggest, kindest heart in the whole world! 💖

One day, ${name} decided to explore the amazing world of ${concept}. With a brave smile and curious eyes, ${name} set off on an adventure! 🗺️

Along the way, ${name} met talking animals 🦊, friendly clouds ☁️, and even a giggling sun! ☀️ They all wanted to play and share stories about ${concept}.

"You're so special, ${name}!" they all said. "The world is brighter because you're in it!"

As the day turned to night, ${name} yawned a big, sleepy yawn. 🥱 The moon tucked ${name} in with a soft, silvery blanket of starlight. ✨

"Sweet dreams, dear ${name}," whispered the wind. "Tomorrow holds even more magic!"

And with a happy heart, ${name} drifted off to sleep, dreaming of tomorrow's adventures. 🌙💫

The end. Goodnight! 😴`
      },
      {
        title: `🌙 ${name}'s Dreamy Journey Through ${concept.charAt(0).toUpperCase() + concept.slice(1)}`,
        content: `Close your eyes, little one, and listen to this magical tale... 🌟

Once there was a wonderful child named ${name}, who was exactly ${age} years old. ${name} loved nothing more than learning about ${concept}! 📚

One night, as ${name} was falling asleep, something amazing happened. The stars above began to twinkle in a special pattern, spelling out: "${name}, come on an adventure!" ⭐

${name} climbed onto a soft, fluffy cloud and floated up, up, up into the night sky! ☁️ The cloud carried ${name} to a magical place where everything was about ${concept}!

There were ${concept}-shaped flowers 🌸, ${concept}-colored butterflies 🦋, and even a wise old owl who taught ${name} all about ${concept} in the most fun way ever! 🦉

"You have a gift, ${name}," said the owl. "You can imagine anything you want!"

As the night grew deeper, ${name} felt sleepiness wrapping around like a warm, cozy blanket. 🛏️ The cloud gently floated back down, tucking ${name} safely into bed.

"Goodnight, sweet ${name}," whispered the stars. "Dream big dreams!" 💫

And ${name} slept peacefully until morning. The end. 🌅`
      }
    ];

    const randomIndex = Math.floor(Math.random() * templates.length);
    return templates[randomIndex];
  };

  const styles = {
    container: {
      minHeight: '100vh',
      padding: '2rem',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    },
    card: {
      maxWidth: '800px',
      margin: '0 auto',
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '2rem',
      padding: '3rem',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
    },
    header: {
      textAlign: 'center',
      marginBottom: '2rem',
    },
    title: {
      fontSize: '2.5rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '0.5rem',
    },
    subtitle: {
      fontSize: '1.2rem',
      color: '#666',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
    },
    label: {
      fontSize: '1.1rem',
      fontWeight: '600',
      color: '#333',
    },
    input: {
      padding: '1rem',
      borderRadius: '0.75rem',
      border: '2px solid #e0e0e0',
      fontSize: '1rem',
      transition: 'border-color 0.3s ease',
    },
    textarea: {
      padding: '1rem',
      borderRadius: '0.75rem',
      border: '2px solid #e0e0e0',
      fontSize: '1rem',
      minHeight: '120px',
      resize: 'vertical',
      fontFamily: 'inherit',
    },
    button: {
      padding: '1.25rem 2rem',
      fontSize: '1.2rem',
      fontWeight: '700',
      borderRadius: '1rem',
      border: 'none',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 5px 15px rgba(102, 126, 234, 0.4)',
    },
    storyCard: {
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      borderRadius: '1.5rem',
      padding: '2rem',
      marginTop: '2rem',
      animation: 'fadeIn 0.8s ease',
    },
    storyTitle: {
      fontSize: '2rem',
      color: '#667eea',
      marginBottom: '1.5rem',
      textAlign: 'center',
    },
    storyContent: {
      fontSize: '1.2rem',
      lineHeight: '1.8',
      color: '#333',
      whiteSpace: 'pre-wrap',
    },
    error: {
      background: '#fee',
      color: '#c00',
      padding: '1rem',
      borderRadius: '0.75rem',
      marginBottom: '1rem',
    },
    loading: {
      textAlign: 'center',
      padding: '3rem',
    },
    loadingText: {
      fontSize: '1.5rem',
      color: '#667eea',
      marginTop: '1rem',
    },
  };

  return (
    <div style={styles.container}>
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>🌙 AI Bedtime Story Generator</h1>
          <p style={styles.subtitle}>Create a magical personalized story for bedtime! ✨</p>
        </div>

        {!story ? (
          <form onSubmit={handleGenerate} style={styles.form}>
            {error && <div style={styles.error}>⚠️ {error}</div>}

            <div style={styles.inputGroup}>
              <label style={styles.label}>👶 Child's Name</label>
              <input
                type="text"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                placeholder="e.g., Younis"
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>🎂 Age</label>
              <input
                type="number"
                value={childAge}
                onChange={(e) => setChildAge(e.target.value)}
                placeholder="e.g., 7"
                min="3"
                max="12"
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>📖 Story Concept/Theme</label>
              <textarea
                value={storyConcept}
                onChange={(e) => setStoryConcept(e.target.value)}
                placeholder="e.g., A brave astronaut exploring the moon, or A magical forest where animals can talk..."
                style={styles.textarea}
                required
              />
            </div>

            <button
              type="submit"
              disabled={generating}
              style={{
                ...styles.button,
                opacity: generating ? 0.7 : 1,
                cursor: generating ? 'not-allowed' : 'pointer',
              }}
            >
              {generating ? '🪄 Creating Magic...' : '✨ Generate Story'}
            </button>
          </form>
        ) : (
          <div>
            <div style={styles.storyCard}>
              <h2 style={styles.storyTitle}>{story.title}</h2>
              <div style={styles.storyContent}>{story.content}</div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button
                onClick={() => {
                  setStory(null);
                  setChildName('');
                  setChildAge('');
                  setStoryConcept('');
                }}
                style={{
                  ...styles.button,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                }}
              >
                📝 Create Another Story
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`${story.title}\n\n${story.content}`);
                  alert('Story copied to clipboard! 📋');
                }}
                style={{
                  ...styles.button,
                  background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                }}
              >
                📋 Copy Story
              </button>
            </div>
          </div>
        )}

        {generating && (
          <div style={styles.loading}>
            <div style={{ fontSize: '4rem' }}>🪄✨🌙</div>
            <p style={styles.loadingText}>Creating a magical story for {childName}...</p>
          </div>
        )}
      </div>
    </div>
  );
}
