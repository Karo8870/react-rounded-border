import RoundedBorder from './components/rounded-border.tsx';
import './App.css';
import RoundedBorderText from './components/rounded-border-text.tsx';
import IncludeBorder from './components/include-border.tsx';

export default function () {
  return (
    <main className='w-screen h-screen bg-black dark flex flex-col'>
      <RoundedBorder className='flex flex-col items-center' padding={2}>
        <IncludeBorder>
          <span>test</span>
        </IncludeBorder>
        <RoundedBorderText className='w-80 text-4xl text-right'>
          O viziune modernă asupra schițelor lui Caragiale
        </RoundedBorderText>
      </RoundedBorder>
    </main>
  );
}
