'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const CATEGORIES = [
  {
    name: 'Smileys',
    emojis: ['😀','😃','😄','😁','😅','😂','🤣','😊','😇','🙂','😉','😌','😍','🥰','😘','😗','😋','😛','😜','🤪','😝','🤑','🤗','🤭','🤫','🤔','🤐','🤨','😐','😑','😶','😏','😒','🙄','😬','🤥','😌','😔','😪','🤤','😴','😷','🤒','🤕','🤢','🤮','🥴','😵','🤯','🤠','🥳','🥺','😢','😭','😤','😠','😡','🤬','🤡','💩','👻','💀','☠️','👽'],
  },
  {
    name: 'Gestures',
    emojis: ['👍','👎','👊','✊','🤛','🤜','👏','🙌','👐','🤲','🤝','🙏','✌️','🤞','🤟','🤘','👌','✋','🤚','🖐️','✍️','💪','🦵','🦶','👂','👃','🧠','🫀','🫁','👀','👁️','👅','👄','💋'],
  },
  {
    name: 'People',
    emojis: ['👶','🧒','👦','👧','🧑','👨','👩','🧓','👴','👵','👨‍👩‍👧‍👦','👨‍👩‍👦','👨‍👩‍👧','👩‍👩‍👧‍👦','👨‍👨‍👧‍👦','👪','👤','👥','🗣️','👣'],
  },
  {
    name: 'Animals',
    emojis: ['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯','🦁','🐮','🐷','🐸','🐵','🐔','🐧','🐦','🐤','🦆','🦅','🦉','🦇','🐺','🐗','🐴','🦄','🐝','🐛','🦋','🐌','🐞','🐜','🦟','🦗','🐢','🐍','🦎','🦖','🦕','🐙','🦑','🦐','🦀','🐠','🐟','🐡','🐬','🐳','🐋','🦈','🐊'],
  },
  {
    name: 'Food',
    emojis: ['🍏','🍎','🍐','🍊','🍋','🍌','🍉','🍇','🍓','🫐','🍈','🍒','🍑','🥭','🍍','🥥','🥝','🍅','🍆','🥑','🥦','🥬','🥒','🌶️','🫑','🌽','🥕','🫒','🧄','🧅','🥔','🍠','🥐','🍞','🥖','🥨','🧀','🥚','🍳','🥞','🧇','🥓','🥩','🍗','🍖','🌭','🍔','🍟','🍕','🫓','🥪','🥙','🧆','🌮','🌯','🥗','🥘','🫕','🥫','🍝','🍜','🍲','🍛','🍣','🍱','🥟','🦪','🍤','🍙','🍚','🍘','🍥','🥠','🥮','🍢','🍡','🍧','🍨','🍦','🥧','🧁','🍰','🎂','🍮','🍭','🍬','🍫','🍿','🍩','🍪','🌰','🥜','🍯'],
  },
  {
    name: 'Travel',
    emojis: ['🚗','🚕','🚙','🚌','🚎','🏎️','🚓','🚑','🚒','🚐','🛻','🚚','🚛','🚜','🏍️','🛵','🛴','🚲','🛹','🛼','🚏','🛣️','🛤️','⛽','🛳️','⛵','🚤','🛶','✈️','🚁','🚀','🛸','🚠','🚡','🪂','🏔️','⛰️','🌋','🗻','🏕️','🏖️','🏜️','🏝️','🏟️','🏛️','🕌','🕍','⛩️','🕋','⛲','🎡','🎢','🎠','🏗️','🧱','🏘️','🏚️','🏠','🏡','🏢','🏣','🏤','🏥','🏦','🏨','🏩','🏪','🏫','🏬','🏭','🏯','🏰','💒','🗼','🗽','⛪','🛕','🕋'],
  },
  {
    name: 'Objects',
    emojis: ['⌚','📱','💻','⌨️','🖥️','🖨️','🖱️','🖲️','💽','💾','💿','📀','🎥','📸','📹','🎬','📺','📻','🎙️','🎚️','🎛️','🧭','⏱️','⏲️','⏰','🕰️','📡','🔋','🔌','💡','🔦','🪔','🧯','🛢️','💵','💴','💶','💷','💰','💳','💎','⚖️','🧰','🔧','🔨','⚒️','🛠️','⛏️','🪚','🔫','🪓','🔩','⚙️','🗡️','⚔️','🛡️','🔗','⛓️','🧲','🧪','🧫','🧬','🔬','🔭','📐','📏','📎','✂️','📂','🗂️','📅','📆','🗒️','🗓️','📇','📋','📁','📃','📄','📑','📊','📉','📈','🔖','🏷️','✉️','📩','📨','📧','💌','📤','📥','📦','📫','📪','📬','📭','📮','✏️','🖊️','🖋️','✒️','🖌️','🖍️','📝','📜','📖','🔍','🔎','🔐','🔒','🔓','🔏','🛒'],
  },
  {
    name: 'Symbols',
    emojis: ['❤️','🧡','💛','💚','💙','💜','🖤','🤍','🤎','💔','❣️','💕','💞','💓','💗','💖','💘','💝','💟','☮️','✝️','☪️','🕉️','☸️','✡️','🔯','🕎','☯️','☦️','🛐','⛎','♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓','🆔','⚛️','🉑','☢️','☣️','📴','📳','🈶','🈚','🈸','🈺','🈷️','✴️','🆚','💮','🉐','㊙️','㊗️','🈴','🈵','🈹','🈲','🅰️','🅱️','🆎','🆑','🅾️','🆘','❌','⭕','🛑','⛔','📛','🚫','💯','💢','♨️','🚷','🚯','🚳','🚱','🔞','📵','❗','❕','❓','❔','‼️','⁉️','🔅','🔆','〽️','⚠️','🚸','🔱','⚜️','🔰','♻️','✅','🈯','💹','❇️','✳️','❎','🌐','💠','Ⓜ️','🌀','💤','🏧','🚾','♿','🅿️','🈳','🈂️','🛂','🛃','🛄','🛅','🚹','🚺','🚼','⚧️','🚻','🚮','🎦','📶','🈁','🔣','🔤','🔡','🔠','🔢','⌨️','⬆️','⬇️','➡️','⬅️','🔃','🔄','↖️','↗️','↘️','↙️','↔️','↕️','◀️','▶️','🔼','🔽','↩️','↪️','ℹ️','⏪','⏩','⏫','⏬','⤵️','⤴️'],
  },
];

const ALL_EMOJIS = CATEGORIES.flatMap((c) => c.emojis);
const RECENT_KEY = 'opencode_recent_emojis';

function getRecent(): string[] {
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveRecent(emoji: string) {
  const recent = getRecent().filter((e) => e !== emoji);
  recent.unshift(emoji);
  localStorage.setItem(RECENT_KEY, JSON.stringify(recent.slice(0, 20)));
}

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
  onClose: () => void;
}

export function EmojiPicker({ onSelect, onClose }: EmojiPickerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(0);
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    setRecent(getRecent());
  }, []);

  useEffect(() => {
    if (search) setCategory(-1);
  }, [search]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleSelect = useCallback((emoji: string) => {
    saveRecent(emoji);
    setRecent(getRecent());
    onSelect(emoji);
    onClose();
  }, [onSelect, onClose]);

  const filtered = useMemo(() => {
    if (!search) return null;
    const q = search.toLowerCase();
    return ALL_EMOJIS.filter((e) => e.toLowerCase().includes(q));
  }, [search]);

  return (
    <div
      ref={ref}
      className='absolute bottom-full left-0 mb-2 z-50 bg-white dark:bg-[#17212b] rounded-xl shadow-lg border border-[#e5e5ea] dark:border-[#1f2c38] w-[320px]'
    >
      <div className='p-2 border-b border-[#e5e5ea] dark:border-[#1f2c38]'>
        <input
          type='text'
          placeholder='Search emoji...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='w-full h-9 px-3 bg-[#f4f4f5] dark:bg-[#242f3d] rounded-lg text-sm text-[#000] dark:text-[#fff] placeholder:text-[#8e8e93] outline-none'
          autoFocus
        />
      </div>

      <div className='flex gap-1 px-2 py-1.5 border-b border-[#e5e5ea] dark:border-[#1f2c38] overflow-x-auto'>
        {CATEGORIES.map((cat, i) => (
          <button
            key={cat.name}
            onClick={() => { setCategory(i); setSearch(''); }}
            className={`px-2 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              category === i
                ? 'bg-[#2AABEE] text-white'
                : 'text-[#8e8e93] hover:text-[#000] dark:hover:text-[#fff] hover:bg-[#f4f4f5] dark:hover:bg-[#202e3c]'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className='max-h-56 overflow-y-auto p-2'>
        {filtered ? (
          filtered.length === 0 ? (
            <div className='text-center py-6 text-sm text-[#8e8e93]'>No emoji found</div>
          ) : (
            <div className='grid grid-cols-8 gap-1'>
              {filtered.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => handleSelect(emoji)}
                  className='w-8 h-8 flex items-center justify-center text-lg hover:bg-[#f4f4f5] dark:hover:bg-[#202e3c] rounded-lg transition-colors'
                >
                  {emoji}
                </button>
              ))}
            </div>
          )
        ) : category === -1 ? (
          <div className='grid grid-cols-8 gap-1'>
            {ALL_EMOJIS.map((emoji) => (
              <button
                key={emoji}
                onClick={() => handleSelect(emoji)}
                className='w-8 h-8 flex items-center justify-center text-lg hover:bg-[#f4f4f5] dark:hover:bg-[#202e3c] rounded-lg transition-colors'
              >
                {emoji}
              </button>
            ))}
          </div>
        ) : (
          <>
            {category === 0 && recent.length > 0 && (
              <div className='mb-2'>
                <p className='text-[11px] text-[#8e8e93] font-medium mb-1'>Recent</p>
                <div className='grid grid-cols-8 gap-1'>
                  {recent.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => handleSelect(emoji)}
                      className='w-8 h-8 flex items-center justify-center text-lg hover:bg-[#f4f4f5] dark:hover:bg-[#202e3c] rounded-lg transition-colors'
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <p className='text-[11px] text-[#8e8e93] font-medium mb-1'>{CATEGORIES[category].name}</p>
            <div className='grid grid-cols-8 gap-1'>
              {CATEGORIES[category].emojis.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => handleSelect(emoji)}
                  className='w-8 h-8 flex items-center justify-center text-lg hover:bg-[#f4f4f5] dark:hover:bg-[#202e3c] rounded-lg transition-colors'
                >
                  {emoji}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
