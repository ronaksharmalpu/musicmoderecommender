import React, { useState, useRef, useEffect } from 'react';
import { Camera, Music2, Languages, Play, Pause, SkipForward, Volume2, Smile, Frown, Heart, Zap, Coffee } from 'lucide-react';
import { Howl } from 'howler';

// Using free music samples from Mixkit
const DEMO_SONGS = {
  happy: 'https://assets.mixkit.co/music/preview/mixkit-happy-summer-dance-109.mp3',
  sad: 'https://assets.mixkit.co/music/preview/mixkit-sad-piano-loop-1090.mp3',
  energetic: 'https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3',
  romantic: 'https://assets.mixkit.co/music/preview/mixkit-sweet-and-happy-114.mp3',
  relaxed: 'https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3'
};

const mockSongs = {
  happy: {
    english: [
      { title: "Happy", artist: "Pharrell Williams", url: DEMO_SONGS.happy },
      { title: "Can't Stop the Feeling!", artist: "Justin Timberlake", url: DEMO_SONGS.happy },
      { title: "Walking on Sunshine", artist: "Katrina & The Waves", url: DEMO_SONGS.happy },
      { title: "Good as Hell", artist: "Lizzo", url: DEMO_SONGS.happy }
    ],
    spanish: [
      { title: "Vivir Mi Vida", artist: "Marc Anthony", url: DEMO_SONGS.happy },
      { title: "La Bicicleta", artist: "Carlos Vives & Shakira", url: DEMO_SONGS.happy },
      { title: "Mi Gente", artist: "J Balvin", url: DEMO_SONGS.happy },
      { title: "Despacito", artist: "Luis Fonsi", url: DEMO_SONGS.happy }
    ],
    hindi: [
      { title: "Badtameez Dil", artist: "Benny Dayal", url: DEMO_SONGS.happy },
      { title: "London Thumakda", artist: "Labh Janjua", url: DEMO_SONGS.happy },
      { title: "Gallan Goodiyaan", artist: "Daler Mehndi", url: DEMO_SONGS.happy },
      { title: "Nachde Ne Saare", artist: "Jasleen Royal", url: DEMO_SONGS.happy }
    ],
    tamil: [
      { title: "Vaseegara", artist: "Bombay Jayashri", url: DEMO_SONGS.happy },
      { title: "Aaluma Doluma", artist: "Anirudh Ravichander", url: DEMO_SONGS.happy },
      { title: "Rowdy Baby", artist: "Dhanush & Dhee", url: DEMO_SONGS.happy },
      { title: "Nakku Mukka", artist: "Vijay Antony", url: DEMO_SONGS.happy }
    ]
  },
  sad: {
    english: [
      { title: "Someone Like You", artist: "Adele", url: DEMO_SONGS.sad },
      { title: "All of Me", artist: "John Legend", url: DEMO_SONGS.sad },
      { title: "Say Something", artist: "A Great Big World", url: DEMO_SONGS.sad },
      { title: "Fix You", artist: "Coldplay", url: DEMO_SONGS.sad }
    ],
    spanish: [
      { title: "Hasta la Raíz", artist: "Natalia Lafourcade", url: DEMO_SONGS.sad },
      { title: "La Tortura", artist: "Shakira", url: DEMO_SONGS.sad },
      { title: "No Me Doy por Vencido", artist: "Luis Fonsi", url: DEMO_SONGS.sad },
      { title: "Amigo", artist: "Romeo Santos", url: DEMO_SONGS.sad }
    ],
    hindi: [
      { title: "Channa Mereya", artist: "Arijit Singh", url: DEMO_SONGS.sad },
      { title: "Tum Hi Ho", artist: "Arijit Singh", url: DEMO_SONGS.sad },
      { title: "Agar Tum Saath Ho", artist: "Alka Yagnik", url: DEMO_SONGS.sad },
      { title: "Kabira", artist: "Tochi Raina", url: DEMO_SONGS.sad }
    ],
    tamil: [
      { title: "Kannathil Muthamittal", artist: "AR Rahman", url: DEMO_SONGS.sad },
      { title: "Uyirin Uyire", artist: "AR Rahman", url: DEMO_SONGS.sad },
      { title: "Nenjukkul Peidhidum", artist: "Hariharan", url: DEMO_SONGS.sad },
      { title: "Munbe Vaa", artist: "Shreya Ghoshal", url: DEMO_SONGS.sad }
    ]
  },
  energetic: {
    english: [
      { title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars", url: DEMO_SONGS.energetic },
      { title: "Shake It Off", artist: "Taylor Swift", url: DEMO_SONGS.energetic },
      { title: "I Gotta Feeling", artist: "The Black Eyed Peas", url: DEMO_SONGS.energetic },
      { title: "Can't Hold Us", artist: "Macklemore & Ryan Lewis", url: DEMO_SONGS.energetic }
    ],
    spanish: [
      { title: "Danza Kuduro", artist: "Don Omar", url: DEMO_SONGS.energetic },
      { title: "Bailando", artist: "Enrique Iglesias", url: DEMO_SONGS.energetic },
      { title: "La Macarena", artist: "Los del Río", url: DEMO_SONGS.energetic },
      { title: "Gasolina", artist: "Daddy Yankee", url: DEMO_SONGS.energetic }
    ],
    hindi: [
      { title: "Dhoom Machale", artist: "Sunidhi Chauhan", url: DEMO_SONGS.energetic },
      { title: "Zingaat", artist: "Ajay-Atul", url: DEMO_SONGS.energetic },
      { title: "Malhari", artist: "Vishal Dadlani", url: DEMO_SONGS.energetic },
      { title: "Kar Gayi Chull", artist: "Badshah", url: DEMO_SONGS.energetic }
    ],
    tamil: [
      { title: "Dippam Dappam", artist: "Anirudh Ravichander", url: DEMO_SONGS.energetic },
      { title: "Dandanakka", artist: "D. Imman", url: DEMO_SONGS.energetic },
      { title: "Selfie Pulla", artist: "G.V. Prakash Kumar", url: DEMO_SONGS.energetic },
      { title: "Surviva", artist: "Anirudh Ravichander", url: DEMO_SONGS.energetic }
    ]
  },
  romantic: {
    english: [
      { title: "Perfect", artist: "Ed Sheeran", url: DEMO_SONGS.romantic },
      { title: "Just the Way You Are", artist: "Bruno Mars", url: DEMO_SONGS.romantic },
      { title: "At Last", artist: "Etta James", url: DEMO_SONGS.romantic },
      { title: "Make You Feel My Love", artist: "Adele", url: DEMO_SONGS.romantic }
    ],
    spanish: [
      { title: "Bésame Mucho", artist: "Cesária Évora", url: DEMO_SONGS.romantic },
      { title: "Hero", artist: "Enrique Iglesias", url: DEMO_SONGS.romantic },
      { title: "Amor Eterno", artist: "Juan Gabriel", url: DEMO_SONGS.romantic },
      { title: "Contigo en la Distancia", artist: "Luis Miguel", url: DEMO_SONGS.romantic }
    ],
    hindi: [
      { title: "Tere Liye", artist: "Atif Aslam", url: DEMO_SONGS.romantic },
      { title: "Pehla Nasha", artist: "Udit Narayan", url: DEMO_SONGS.romantic },
      { title: "Mere Haath Mein", artist: "Sonu Nigam", url: DEMO_SONGS.romantic },
      { title: "Tum Se Hi", artist: "Mohit Chauhan", url: DEMO_SONGS.romantic }
    ],
    tamil: [
      { title: "Thalli Pogathey", artist: "Sid Sriram", url: DEMO_SONGS.romantic },
      { title: "Maruvaarthai", artist: "Sid Sriram", url: DEMO_SONGS.romantic },
      { title: "Nenjukkul", artist: "Harris Jayaraj", url: DEMO_SONGS.romantic },
      { title: "Kadhal Sadugudu", artist: "Unni Menon", url: DEMO_SONGS.romantic }
    ]
  },
  relaxed: {
    english: [
      { title: "Chasing Cars", artist: "Snow Patrol", url: DEMO_SONGS.relaxed },
      { title: "Somewhere Over the Rainbow", artist: "Israel Kamakawiwo'ole", url: DEMO_SONGS.relaxed },
      { title: "The Sound of Silence", artist: "Simon & Garfunkel", url: DEMO_SONGS.relaxed },
      { title: "Hallelujah", artist: "Jeff Buckley", url: DEMO_SONGS.relaxed }
    ],
    spanish: [
      { title: "La Bikina", artist: "Luis Miguel", url: DEMO_SONGS.relaxed },
      { title: "Historia de Un Amor", artist: "Guadalupe Pineda", url: DEMO_SONGS.relaxed },
      { title: "Sabor a Mí", artist: "Los Panchos", url: DEMO_SONGS.relaxed },
      { title: "Guantanamera", artist: "Celia Cruz", url: DEMO_SONGS.relaxed }
    ],
    hindi: [
      { title: "Lag Ja Gale", artist: "Lata Mangeshkar", url: DEMO_SONGS.relaxed },
      { title: "Kun Faya Kun", artist: "AR Rahman", url: DEMO_SONGS.relaxed },
      { title: "Ae Zindagi Gale Laga Le", artist: "Alka Yagnik", url: DEMO_SONGS.relaxed },
      { title: "Iktara", artist: "Amit Trivedi", url: DEMO_SONGS.relaxed }
    ],
    tamil: [
      { title: "Malare", artist: "Vijay Yesudas", url: DEMO_SONGS.relaxed },
      { title: "Nenjukkul Peithidum", artist: "Hariharan", url: DEMO_SONGS.relaxed },
      { title: "Vennilave", artist: "Hariharan", url: DEMO_SONGS.relaxed },
      { title: "Moongil Thottam", artist: "AR Rahman", url: DEMO_SONGS.relaxed }
    ]
  }
};

function App() {
  const [currentEmotion, setCurrentEmotion] = useState<string>('happy');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('english');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState<number>(0);
  const [cameraActive, setCameraActive] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [sound, setSound] = useState<Howl | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentSongData = mockSongs[currentEmotion as keyof typeof mockSongs][selectedLanguage as keyof typeof mockSongs['happy']][currentSong];

  useEffect(() => {
    if (sound) {
      sound.unload();
    }
    const newSound = new Howl({
      src: [currentSongData.url],
      volume: volume,
      html5: true,
      onend: () => {
        setCurrentSong((prev) => (prev + 1) % mockSongs[currentEmotion as keyof typeof mockSongs][selectedLanguage as keyof typeof mockSongs['happy']].length);
      }
    });
    setSound(newSound);
  }, [currentSongData.url]);

  useEffect(() => {
    if (sound) {
      sound.volume(volume);
    }
  }, [volume, sound]);

  useEffect(() => {
    if (isPlaying && sound) {
      sound.play();
    } else if (sound) {
      sound.pause();
    }
  }, [isPlaying, sound]);

  useEffect(() => {
    if (cameraActive && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.error("Error accessing camera:", err);
          setCameraActive(false);
        });
    } else if (!cameraActive && videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }

    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [cameraActive]);

  const handleCapture = () => {
    setCameraActive(!cameraActive);
    if (cameraActive) {
      const emotions = ['happy', 'sad', 'energetic', 'romantic', 'relaxed'];
      const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
      setCurrentEmotion(randomEmotion);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value) / 100;
    setVolume(newVolume);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const getEmotionIcon = (emotion: string) => {
    switch (emotion) {
      case 'happy':
        return <Smile size={20} />;
      case 'sad':
        return <Frown size={20} />;
      case 'energetic':
        return <Zap size={20} />;
      case 'romantic':
        return <Heart size={20} />;
      case 'relaxed':
        return <Coffee size={20} />;
      default:
        return <Smile size={20} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">AI Music Mood Recommender</h1>
          <p className="text-lg text-purple-200">Discover music that matches your mood</p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Emotion Detection */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
            <div className="text-center">
              <div className="mb-6">
                <div className="w-64 h-64 mx-auto bg-gray-800 rounded-xl flex items-center justify-center mb-4 overflow-hidden">
                  {cameraActive ? (
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Camera size={48} className="text-purple-300" />
                  )}
                </div>
                <button
                  onClick={handleCapture}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full transition duration-300"
                >
                  {cameraActive ? 'Capture Emotion' : 'Start Camera'}
                </button>
              </div>
              <div className="mt-4">
                <p className="text-xl mb-2">Current Mood:</p>
                <p className="text-2xl font-bold capitalize text-purple-300 mb-4">{currentEmotion}</p>
                
                {/* Manual Emotion Selection */}
                <div className="flex flex-wrap justify-center gap-4">
                  {['happy', 'sad', 'energetic', 'romantic', 'relaxed'].map((emotion) => (
                    <button
                      key={emotion}
                      onClick={() => setCurrentEmotion(emotion)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full transition duration-300 ${
                        currentEmotion === emotion ? 'bg-purple-600' : 'bg-white/10 hover:bg-white/20'
                      }`}
                    >
                      {getEmotionIcon(emotion)}
                      <span className="capitalize">{emotion}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Music Player */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Music2 size={24} />
                  <h2 className="text-xl font-semibold">Music Player</h2>
                </div>
                <div className="flex items-center gap-2">
                  <Languages size={20} />
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="bg-transparent border border-purple-400 rounded-lg px-3 py-1"
                  >
                    <option value="english" className="text-black">English</option>
                    <option value="spanish" className="text-black">Spanish</option>
                    <option value="hindi" className="text-black">Hindi</option>
                    <option value="tamil" className="text-black">Tamil</option>
                  </select>
                </div>
              </div>

              {/* Song List */}
              <div className="space-y-4 mb-6">
                {mockSongs[currentEmotion as keyof typeof mockSongs][selectedLanguage as keyof typeof mockSongs['happy']].map((song, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg transition-all duration-300 cursor-pointer ${
                      currentSong === index
                        ? 'bg-purple-600'
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                    onClick={() => {
                      setCurrentSong(index);
                      setIsPlaying(true);
                    }}
                  >
                    <h3 className="font-semibold">{song.title}</h3>
                    <p className="text-sm text-purple-300">{song.artist}</p>
                  </div>
                ))}
              </div>

              {/* Player Controls */}
              <div className="flex items-center justify-center gap-6">
                <button
                  onClick={handlePlayPause}
                  className="bg-purple-600 p-4 rounded-full hover:bg-purple-700 transition duration-300"
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>
                <button
                  onClick={() => {
                    setCurrentSong((prev) => (prev + 1) % mockSongs[currentEmotion as keyof typeof mockSongs][selectedLanguage as keyof typeof mockSongs['happy']].length);
                    setIsPlaying(true);
                  }}
                  className="bg-purple-600/50 p-3 rounded-full hover:bg-purple-600 transition duration-300"
                >
                  <SkipForward size={20} />
                </button>
                <div className="flex items-center gap-2">
                  <Volume2 size={20} />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume * 100}
                    onChange={handleVolumeChange}
                    className="w-24 accent-purple-600"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;