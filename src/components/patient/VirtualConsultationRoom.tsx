import React, { useState } from 'react';
import { Video, Mic, MicOff, Camera, VideoOff, MessageSquare, Send, FileText, PhoneOff, CheckCircle2, ShieldCheck } from 'lucide-react';

export const VirtualConsultationRoom: React.FC = () => {
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [chatOpen, setChatOpen] = useState(true);
  const [messages, setMessages] = useState<{ sender: string; text: string; time: string }[]>([
    { sender: 'Dr. Rajinder Pal Singh', text: 'Sat Sri Akal Harpreet Ji. I am reviewing your blood pressure logs from Kakra village.', time: '10:30 AM' },
    { sender: 'Harpreet Kaur', text: 'Doctor Sahib, I have mild headache and dizziness since yesterday evening.', time: '10:31 AM' },
    { sender: 'Dr. Rajinder Pal Singh', text: 'I see your BP reading was 138/88. I am issuing an iron supplement & low-salt dietary plan now.', time: '10:32 AM' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [callEnded, setCallEnded] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setMessages([
      ...messages,
      { sender: 'Harpreet Kaur', text: newMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
    setNewMessage('');
  };

  return (
    <div className="space-y-4">
      {/* Consultation Bar */}
      <div className="bg-slate-900 text-white p-4 rounded-2xl flex items-center justify-between shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 p-0.5 border-2 border-emerald-400">
            <img src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=250&q=80" alt="Dr Rajinder" className="w-full h-full rounded-full object-cover" />
          </div>
          <div>
            <div className="font-extrabold text-sm flex items-center space-x-1.5">
              <span>Dr. Rajinder Pal Singh</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.2 rounded font-semibold">
                Live Consultation
              </span>
            </div>
            <p className="text-xs text-slate-400">General Medicine • Nabha Civil Hospital Tele-Node</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-emerald-300 font-mono font-bold">1080p HD Encrypted</span>
        </div>
      </div>

      {!callEnded ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Main Video View */}
          <div className="lg:col-span-8 bg-slate-950 rounded-2xl overflow-hidden relative border border-slate-800 shadow-xl min-h-[420px] flex flex-col justify-between p-4">
            {/* Doctor Stream Simulation */}
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
              {cameraOn ? (
                <div className="relative w-full h-full">
                  <img
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=80"
                    alt="Doctor Video Stream"
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur px-3 py-1.5 rounded-lg text-white text-xs font-semibold border border-slate-700">
                    Dr. Rajinder Pal Singh (Nabha Civil Hospital)
                  </div>
                </div>
              ) : (
                <div className="text-slate-500 text-xs font-medium">Camera Disabled</div>
              )}
            </div>

            {/* Self Video PIP Preview */}
            <div className="absolute top-4 right-4 w-32 h-24 bg-slate-800 rounded-xl overflow-hidden border-2 border-slate-700 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80"
                alt="Patient PIP"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-1 left-1 bg-slate-900/80 text-[9px] text-white px-1 rounded">
                You (Harpreet)
              </div>
            </div>

            {/* Bottom Call Control Bar */}
            <div className="relative z-10 mt-auto bg-slate-900/90 backdrop-blur border border-slate-800 p-3 rounded-xl flex items-center justify-center space-x-4 max-w-md mx-auto">
              <button
                onClick={() => setMicOn(!micOn)}
                className={`p-3 rounded-full transition-colors ${micOn ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-red-600 text-white'}`}
              >
                {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setCameraOn(!cameraOn)}
                className={`p-3 rounded-full transition-colors ${cameraOn ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-red-600 text-white'}`}
              >
                {cameraOn ? <Camera className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setChatOpen(!chatOpen)}
                className="p-3 rounded-full bg-slate-800 text-blue-400 hover:bg-slate-700 transition-colors"
              >
                <MessageSquare className="w-5 h-5" />
              </button>

              <button
                onClick={() => setCallEnded(true)}
                className="p-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold transition-all shadow-lg"
              >
                <PhoneOff className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Chat & Live Prescription Side Panel */}
          {chatOpen && (
            <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col justify-between h-[420px]">
              <div className="pb-2 border-b border-slate-100 flex items-center justify-between">
                <span className="font-bold text-slate-900 text-xs">Consultation Chat</span>
                <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                  Live Sync
                </span>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto space-y-3 py-3 pr-1 text-xs">
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-xl max-w-[85%] ${
                      m.sender.includes('Harpreet')
                        ? 'bg-blue-600 text-white ml-auto'
                        : 'bg-slate-100 text-slate-800 mr-auto'
                    }`}
                  >
                    <div className="text-[10px] font-bold opacity-80 mb-0.5">{m.sender} • {m.time}</div>
                    <div>{m.text}</div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="pt-2 border-t border-slate-100 flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type symptoms or questions..."
                  className="flex-1 p-2 border border-slate-300 rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}
        </div>
      ) : (
        /* Call Ended View & Generated Digital Prescription */
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6 text-center">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Telemedicine Consultation Completed</h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            Dr. Rajinder Pal Singh has finalized your digital prescription and added dietary instructions to your medical vault.
          </p>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-left text-xs max-w-xl mx-auto space-y-3">
            <div className="flex justify-between font-bold text-slate-900 pb-2 border-b border-slate-200">
              <span>Digital Prescription: RX-2026-9041</span>
              <span>Date: 2026-07-21</span>
            </div>
            <div>
              <span className="font-semibold text-slate-800">Diagnosis:</span>
              <p className="text-slate-600">Stage-1 Hypertension & Mild Iron Deficiency</p>
            </div>
            <div>
              <span className="font-semibold text-slate-800">Medicines Prescribed:</span>
              <p className="text-slate-600">• Ferrous Ascorbate (100mg) - 1 daily after breakfast (30 days)</p>
              <p className="text-slate-600">• Amlodipine (5mg) - 1 daily morning (BP Control)</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
