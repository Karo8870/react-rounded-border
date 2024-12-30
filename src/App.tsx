import RoundedBorder from './components/rounded-border.tsx';
import './App.css';
import RoundedTextBorder from './components/rounded-text-border.tsx';
import IncludeBorder from './components/include-border.tsx';

export default function () {
  return (
    <main className='w-screen h-screen bg-black dark flex flex-col'>
      <RoundedBorder
        className='flex flex-col items-end p-20'
        paddingBottom={8}
        paddingLeft={12}
        paddingRight={12}
        borderRadius={16}
      >
        <RoundedTextBorder className='font-semibold text-black text-3xl w-[450px] text-right'>
          O viziune modernă asupra schițelor lui Caragiale
        </RoundedTextBorder>
        <IncludeBorder>
          <label>Darius Covaciu</label>
        </IncludeBorder>
      </RoundedBorder>
    </main>
  );
}
