import { useState } from 'react'
import { Container, Section, Button, Card, Flex, Text, Heading } from '@radix-ui/themes'
import { Theme } from '@radix-ui/themes'
import { ThemeProvider } from 'next-themes'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <ThemeProvider attribute="class">
      <Theme>
        <Container size="2">            
          <Section>
            <Heading as="h1">Hello, World</Heading>
            <Text as="p">I think enterprise software can be interesting.</Text>
            <Card>
              <Flex direction="column" align="center">
              <Button variant="outline" onClick={() => setCount((count) => count + 1)}>
                count is {count}
              </Button>
              <Text as="p">
                Edit <code>src/App.tsx</code> and save to test HMR
              </Text>
              <Text as="p" className="read-the-docs">
                Click on the Vite and React logos to learn more
              </Text>
              </Flex>
            </Card>
          </Section>
        </Container>
      </Theme>
    </ThemeProvider>
  )
}

export default App
