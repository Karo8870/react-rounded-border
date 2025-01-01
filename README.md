## About The Project

React rounded border is a simple package that can add a round border to elements and text in React.

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Installation

```bash
npm install react-rounded-border
```

## Usage

To add a round border around elements, you first need to add a base. You do so by wrapping your components in a `<RoundedBorder>` component. After that, any component wrapped inside an `<IncludeBorder>` will be included in the round border.

For multiline text, if you want  each line to be added individually, use `<RoundedTextBorder>` the same way as `<IncludeBorder>`.

### Example

```tsx
import { RoundedBorder, RoundedTextBorder, IncludeBorder} from 'react-rounded-border';

export default function () {
    return (
        <main className='w-screen h-screen bg-black dark flex flex-col'>
            <RoundedBorder
                className='flex flex-col items-end p-20'
                paddingTop={4}
                paddingBottom={8}
                paddingLeft={12}
                paddingRight={12}
                borderRadius={10}
            >
                <RoundedTextBorder className='font-semibold text-black text-3xl w-[450px] text-right'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </RoundedTextBorder>
                <IncludeBorder>
                    <label>John Doe</label>
                </IncludeBorder>
            </RoundedBorder>
        </main>
    );
}
```

## License

MIT licence. See `LICENSE` for more information.
