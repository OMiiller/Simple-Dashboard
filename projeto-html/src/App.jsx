import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, Upload, Plus, Sun, CheckCircle, Trash2, MapPin, Sparkles } from 'lucide-react';

// ==========================================
// COMPONENTE: MUSIC PLAYER
// ==========================================
function MusicPlayer() {
  const [playlist, setPlaylist] = useState([
    { name: 'Música Base', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' }
  ]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const [customName, setCustomName] = useState('');
  const [customUrl, setCustomUrl] = useState('');

  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.error("Erro ao tocar áudio:", err));
    }
    setIsPlaying(!isPlaying);
  };

  const handleSelectTrack = (e) => {
    const index = Number(e.target.value);
    setCurrentTrackIndex(index);
    setIsPlaying(false);
  };

  const handleAddUrl = () => {
    if (!customUrl) return;
    const newTrack = {
      name: customName || `Música ${playlist.length + 1}`,
      url: customUrl
    };
    setPlaylist([...playlist, newTrack]);
    setCustomName('');
    setCustomUrl('');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      const newTrack = {
        name: file.name.replace(/\.[^/.]+$/, ""),
        url: fileUrl
      };
      setPlaylist([...playlist, newTrack]);
      setCurrentTrackIndex(playlist.length);
      setIsPlaying(false);
    }
  };

  return (
    <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/80 p-6 rounded-3xl shadow-2xl shadow-indigo-950/20 flex flex-col lg:flex-row gap-6 items-center">
      <audio
        ref={audioRef}
        src={playlist[currentTrackIndex]?.url}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="flex-1 flex items-center gap-4 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 shadow-inner w-full">
        <div className="relative w-12 h-12 rounded-full bg-slate-900 border border-indigo-500/30 flex items-center justify-center shadow-lg">
          <div className={`w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center transition-all ${isPlaying ? 'animate-spin' : ''}`}>
            <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <span className="text-[10px] font-bold text-indigo-400 tracking-widest uppercase block">Tocando Agora</span>
          <h4 className="font-semibold text-slate-100 truncate text-sm mt-0.5">{playlist[currentTrackIndex]?.name}</h4>
          
          <select 
            value={currentTrackIndex} 
            onChange={handleSelectTrack}
            className="mt-1 bg-slate-900 text-xs text-slate-300 rounded-lg px-2.5 py-1 border border-slate-800 outline-none w-full cursor-pointer hover:border-slate-700 transition"
          >
            {playlist.map((track, idx) => (
              <option key={idx} value={idx}>{track.name}</option>
            ))}
          </select>
        </div>

        <button
          onClick={togglePlay}
          className="bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white p-3.5 rounded-2xl transition shadow-lg shadow-indigo-600/30 flex items-center justify-center"
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
        </button>
      </div>

      <div className="flex items-center gap-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 shadow-inner w-full lg:w-auto">
        <Volume2 size={18} className="text-slate-400" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-24 accent-indigo-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
        />
        <span className="text-xs text-slate-400 w-8 font-mono">{Math.round(volume * 100)}%</span>
      </div>

      <div className="flex flex-col gap-2 w-full lg:w-auto">
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Adicionar Música</span>
        
        <div className="flex gap-2">
          <label className="bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-medium px-3.5 py-2 rounded-xl cursor-pointer border border-slate-700/60 flex items-center gap-2 transition hover:shadow-md">
            <Upload size={14} className="text-indigo-400" />
            <span>Arquivo MP3</span>
            <input type="file" accept="audio/mp3,audio/wav" onChange={handleFileUpload} className="hidden" />
          </label>

          <input
            type="text"
            placeholder="Nome"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            className="bg-slate-950/80 text-xs px-3 py-2 rounded-xl border border-slate-800/80 w-24 outline-none focus:border-indigo-500 transition"
          />
          <input
            type="text"
            placeholder="Link (.mp3)"
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            className="bg-slate-950/80 text-xs px-3 py-2 rounded-xl border border-slate-800/80 w-32 outline-none focus:border-indigo-500 transition"
          />
          <button
            onClick={handleAddUrl}
            className="bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white p-2.5 rounded-xl transition shadow-md shadow-indigo-600/20"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// COMPONENTE INTERATIVO: MINHAS OBRIGAÇÕES
// ==========================================
function ObrigacoesSection() {
  const [tarefas, setTarefas] = useState([
    { id: 1, texto: 'Organizar ambiente de estudo', concluida: false, tempoSegundos: 25 * 60, rodando: false },
    { id: 2, texto: 'Revisar anotações do dia', concluida: false, tempoSegundos: 40 * 60, rodando: false }
  ]);
  const [novaTarefa, setNovaTarefa] = useState('');

  // Controla o Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTarefas((prev) =>
        prev.map((t) => {
          if (t.rodando && t.tempoSegundos > 0) {
            return { ...t, tempoSegundos: t.tempoSegundos - 1 };
          }
          if (t.rodando && t.tempoSegundos === 0) {
            return { ...t, rodando: false };
          }
          return t;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleAdicionar = (e) => {
    e?.preventDefault();
    if (!novaTarefa.trim()) return;
    const item = {
      id: Date.now(),
      texto: novaTarefa,
      concluida: false,
      tempoSegundos: 25 * 60, // 25 minutos padrão
      rodando: false
    };
    setTarefas([...tarefas, item]);
    setNovaTarefa('');
  };

  const toggleConcluida = (id) => {
    setTarefas(tarefas.map(t => t.id === id ? { ...t, concluida: !t.concluida, rodando: false } : t));
  };

  const toggleTimer = (id) => {
    setTarefas(tarefas.map(t => t.id === id ? { ...t, rodando: !t.rodando } : t));
  };

  const removerTarefa = (id) => {
    setTarefas(tarefas.filter(t => t.id !== id));
  };

  const formatarTempo = (segundos) => {
    const min = Math.floor(segundos / 60);
    const seg = segundos % 60;
    return `${String(min).padStart(2, '0')}:${String(seg).padStart(2, '0')}`;
  };

  const concluidasCount = tarefas.filter(t => t.concluida).length;

  return (
    <section className="md:col-span-2 bg-slate-900/50 backdrop-blur-xl border border-slate-800/80 p-6 rounded-3xl shadow-xl space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-white">Minhas Obrigações</h3>
        <span className="text-xs bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-3 py-1 rounded-full font-semibold">
          {concluidasCount} de {tarefas.length} prontas
        </span>
      </div>

      <form onSubmit={handleAdicionar} className="flex gap-2">
        <input
          type="text"
          placeholder="O que você precisa fazer?"
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
          className="flex-1 bg-slate-950/70 text-xs px-3.5 py-2.5 rounded-xl border border-slate-800 outline-none focus:border-indigo-500 transition text-slate-100"
        />
        <div className="flex items-center gap-1.5 bg-slate-950/70 px-3 rounded-xl border border-slate-800 text-xs text-slate-400 font-mono">
          <span>⏱</span>
          <span>25 min</span>
        </div>
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition shadow-md shadow-indigo-600/20"
        >
          + Criar
        </button>
      </form>

      <div className="space-y-2 mt-4 max-h-[280px] overflow-y-auto pr-1">
        {tarefas.map((tarefa) => (
          <div
            key={tarefa.id}
            className={`bg-slate-950/50 hover:bg-slate-950/80 border p-3.5 rounded-2xl flex items-center justify-between transition ${
              tarefa.concluida ? 'border-emerald-500/30 opacity-60' : 'border-slate-800/60'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0 flex-1 mr-2">
              <button
                onClick={() => toggleConcluida(tarefa.id)}
                className={`transition ${tarefa.concluida ? 'text-emerald-400' : 'text-slate-600 hover:text-indigo-400'}`}
              >
                <CheckCircle size={18} />
              </button>
              <span className={`text-sm font-medium truncate ${tarefa.concluida ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                {tarefa.texto}
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className={`font-mono px-2 py-1 rounded-md border ${
                tarefa.rodando ? 'bg-indigo-950/50 border-indigo-500/40 text-indigo-300 animate-pulse' : 'bg-slate-900 border-slate-800'
              }`}>
                {formatarTempo(tarefa.tempoSegundos)}
              </span>

              <button
                onClick={() => toggleTimer(tarefa.id)}
                disabled={tarefa.concluida}
                className="hover:text-indigo-400 transition p-1 disabled:opacity-30"
              >
                {tarefa.rodando ? <Pause size={14} className="text-indigo-400" /> : <Play size={14} />}
              </button>

              <button
                onClick={() => removerTarefa(tarefa.id)}
                className="hover:text-red-400 transition p-1"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}

        {tarefas.length === 0 && (
          <p className="text-center text-xs text-slate-500 py-6">Nenhuma obrigação pendente por enquanto!</p>
        )}
      </div>
    </section>
  );
}

// ==========================================
// COMPONENTE PRINCIPAL: APP
// ==========================================
export default function App() {
  const [horaAtual, setHoraAtual] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setHoraAtual(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hora = horaAtual.getHours();
  const saudacao = hora < 12 ? 'Bom dia' : hora < 18 ? 'Boa tarde' : 'Boa noite';

  const horaFormatada = horaAtual.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 space-y-6 selection:bg-indigo-500 selection:text-white">
      {/* CABEÇALHO */}
      <header className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/80 p-6 rounded-3xl shadow-xl shadow-indigo-950/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[10px] text-indigo-400 font-bold tracking-widest uppercase flex items-center gap-1.5">
            <Sparkles size={12} /> Espaço Pessoal de Foco
          </span>
          <h1 className="text-3xl font-extrabold mt-1 bg-gradient-to-r from-white via-slate-200 to-indigo-200 bg-clip-text text-transparent">
            {saudacao}, bem-vindo de volta
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xl font-mono font-bold text-indigo-300 bg-slate-950/80 px-4 py-2 rounded-2xl border border-indigo-500/20 shadow-inner flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
            {horaFormatada}
          </div>

          <div className="text-xs text-slate-400 bg-slate-950/60 px-3.5 py-2.5 rounded-2xl border border-slate-800/80 flex items-center gap-2 shadow-inner">
            <MapPin size={12} className="text-indigo-400" />
            <span>São Paulo, BR</span>
          </div>
        </div>
      </header>

      {/* PLAYER DE MÚSICA */}
      <MusicPlayer />

      {/* GRID INFERIOR */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* CARD CLIMA ANIMADO */}
        <section className="relative overflow-hidden bg-slate-900/50 backdrop-blur-xl border border-slate-800/80 p-6 rounded-3xl shadow-xl flex flex-col justify-between group">
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-all duration-700 animate-pulse" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all duration-700" />

          <div className="relative z-10">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Clima Atual</span>
              <div className="text-4xl filter drop-shadow-[0_0_12px_rgba(251,191,36,0.4)] animate-bounce duration-1000">
                ☀️
              </div>
            </div>

            <div className="mt-2">
              <h2 className="text-5xl font-black text-white tracking-tight flex items-baseline gap-1">
                15<span className="text-3xl text-indigo-400 font-bold">°C</span>
              </h2>
              <p className="text-xs text-slate-400 mt-2 flex items-center gap-1.5 font-medium">
                <span className="text-sm">💨</span> Vento a 7.7 km/h
              </p>
            </div>
          </div>

          <div className="relative z-10 mt-8 pt-4 border-t border-slate-800/60 flex justify-between items-center text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <Sun size={14} className="text-amber-400" /> Open-Meteo
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Ao vivo
            </span>
          </div>
        </section>

        {/* CARD MINHAS OBRIGAÇÕES (COMPONENTE INTERATIVO) */}
        <ObrigacoesSection />

      </div>
    </div>
  );
}