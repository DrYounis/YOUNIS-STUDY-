import { NextResponse } from 'next/server';

export async function POST(request) {
  console.log('🚀 API Route called');
  
  try {
    let requestData;
    try {
      requestData = await request.json();
      console.log('📥 Request data:', requestData);
    } catch (parseError) {
      console.error('Failed to parse request:', parseError);
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      );
    }

    const { childName, childAge, storyConcept } = requestData;

    console.log('📖 Story request received:', { childName, childAge, storyConcept });
    console.log('🔑 Groq API Key exists:', !!process.env.GROQ_API_KEY);

    if (!childName || !childAge || !storyConcept) {
      return NextResponse.json(
        { error: 'Please provide child name, age, and story concept' },
        { status: 400 }
      );
    }

    // Always use template for now (more reliable)
    console.log('✅ Using template story generator');
    const storyData = generateTemplateStory(childName, childAge, storyConcept);
    console.log('📦 Generated story:', { title: storyData.title, contentLength: storyData.content.length });
    
    return NextResponse.json(storyData);

  } catch (error) {
    console.error('❌ Story generation error:', error);
    console.error('Error details:', error.message, error.stack);
    
    // Return a valid JSON response even on error
    return NextResponse.json({
      title: "A Magical Bedtime Story",
      content: "Once upon a time, there was a wonderful child who loved adventures. One day, they discovered something magical that changed their life forever. And they lived happily ever after. 🌟"
    });
  }
}

// Fallback template generator (when API is unavailable)
function generateTemplateStory(name, age, concept) {
  const capitalizedConcept = concept.charAt(0).toUpperCase() + concept.slice(1);
  
  return {
    title: `🌟 ${name}'s Magical ${capitalizedConcept} Adventure`,
    content: `Once upon a time, in a cozy little house just like yours, lived a brave ${age}-year-old adventurer named ${name}. 🏠✨

One peaceful evening, ${name} discovered something magical about: ${concept}. It was like finding a secret treasure! 💎

${name} closed their eyes and imagined floating on a fluffy cloud ☁️, drifting through a sky filled with twinkling stars ⭐. Each star whispered kind words: "You are brave, ${name}!" "You are kind!" "You are special!"

As ${name} journeyed through this dreamy land, they met friendly characters who loved ${concept} just as much as they did! Together, they learned that the most magical thing in the whole universe was... believing in yourself! 🌈

The moon smiled down and sang a gentle lullaby 🌙🎵. ${name} felt warm, safe, and so very sleepy...

And as ${name}'s eyes grew heavy, they knew that tomorrow would bring new adventures. But for now, it was time to rest and dream sweet dreams. 💤

Goodnight, brave ${name}. The end. 🌟`
  };
}
