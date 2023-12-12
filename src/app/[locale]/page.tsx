import { Button, Code, Heading } from '@radix-ui/themes'

export default function Home() {
  return (
    <div className="flex flex-col items-start gap-4 p-8">
      <h1>Hello world</h1>

      <Heading>Hello world</Heading>

      <pre>console.log(123)</pre>

      <Code>console.log(123)</Code>

      <button type="button">Hello world</button>

      <Button>Hello world</Button>
    </div>
  )
}
