import { Box, Code, Divider, Heading, Link, List, ListItem, Text } from "@chakra-ui/react";
import { FC } from "react";

export const GettingStartedWithMidjourney: FC = () => {
  return (
    <Box maxWidth={800} padding={5} marginLeft='auto' marginRight='auto'>
      <Heading as='h1' size='xl'>Getting started with Midjourney</Heading>
      <Divider marginTop={5} marginBottom={5} />
      <Heading as='h2' size='lg'>The Basics</Heading>

      <Box marginTop={2} marginBottom={2}>
        <Text>Midjourney is running on a chat platform named Discord, running on <Link href="https://discord.com/">https://discord.com/</Link></Text>
        <Text>So first, create a Discord account, if you don't already have one.</Text>
      </Box>


      <Box marginTop={2} marginBottom={2}>
        <Text>Now you will need to join Midjourney. Go to <Link href="https://www.midjourney.com/">https://www.midjourney.com/</Link> and click the "Join the Beta" Button, to join the Midjourney server.</Text>
        <Text>The easiest way to get startet is to enter one of the "Newbie" channels.</Text>
        <Text>To create your first image, type <Code as='span'>/imagine</Code>, followed by a description of the image.</Text>
      </Box>

      <Box marginTop={2} marginBottom={2}>
        <Text>For example:</Text>
        <Code border={'1px solid grey'} padding={2}>/imagine A snow leopard prowling silently through a Himalayan blizzard, shot with a telephoto lens. Hyper-realistic style, harsh environment, mountain setting</Code>
      </Box>

      <Box marginTop={2} marginBottom={2}>
        <Text>Midjourney will now work for a few moments. When it is done, you will see a preview of four images. If you like one of the images, use the corresponding "U" button to get an upscaled version of it, bigger and in better quality.</Text>
      </Box>

      <Box marginTop={2} marginBottom={2}>
        <List>
          <ListItem>U1 is for the upper left image.</ListItem>
          <ListItem>U2 is for the upper right image.</ListItem>
          <ListItem>U3 is for the bottom left image.</ListItem>
          <ListItem>U4 is for the bottom right image.</ListItem>
        </List>
      </Box>

      <Box marginTop={2} marginBottom={2}>
        <Text>If you use the style of one of the images, but it's not exactly as you imaged, you can use the "V" buttons to generate 4 new images, based on the selected image.</Text>
      </Box>

      <Box marginTop={2} marginBottom={2}>
        <Text>If you don't like any of the images, you can use the "Reroll" button to generate four all new images.</Text>
      </Box>

      <Box marginTop={2} marginBottom={2}>
        <img src="/getting-started.png" />
      </Box>

      <Divider marginTop={5} marginBottom={5} />

      <Heading as='h2' size='lg'>Midjourney Subscription</Heading>

      <Box marginTop={2} marginBottom={2}>
        <Text>
          Sooner or later, you will run out of free image jobs. Now you can either wait for them to replenish, or subscribe to a paid plan.
          To do so, enter <Code as='span'>/subscribe</Code> and confirm.
        </Text>
      </Box>

      <Box marginTop={2} marginBottom={2}>
        <Text>
          You have probably noticed that the newbie-channels are very crowded. As soon as you are on a paid plan, you have some new options: Direct messaging with the midjourney bot, and inviting the midjourney bot to your own Discord server.
        </Text>
      </Box>

      <Box marginTop={2} marginBottom={2}>
        <Text>To start a direct chat with the Midjourney bot, find any message of the Bot, right-click, and choose &quot;Message&quot;.</Text>
      </Box>

      <Box marginTop={2} marginBottom={2}>
        <Text>
          Alternatively, you can create your own Discord server, and invite the Midjourney bot. To do this, create a Discord server. Choose the option &quot;For me and my friends&quot;.
          Now, find any message of the Midjourney bot. Left-click it, and choose &quot;Add to Server&quot;.
          Now, you can interact with the bot on your own channels, and you can also invite friends to the channels to share the artworks.
        </Text>
      </Box>

      <Divider marginTop={5} marginBottom={5} />

      <Heading as='h2' size='lg'>Settings</Heading>

      <Box marginTop={2} marginBottom={2}>
        <Text>To do general setting: Enter <Code as='span'>/settings</Code> and confirm.</Text>
      </Box>

      <Box marginTop={2} marginBottom={2}>
        There you can find the following settings:
      </Box>

      <Box marginTop={2} marginBottom={2}>
        <List>
          <ListItem>The Midjourney Version. Generally it's a good idea to use the highest version available. Alternatively you can use the Niji versions, that are suited for anime and manga styles.</ListItem>
          <ListItem>Style (low, med, high, very high). This sets how "imaginative" Midjourney is when it iterprets image prompts. Generally "med" is a good value to use, but if you want to generate more abstract art, you can set it to a higher value.</ListItem>
        </List>
      </Box>


      <Divider marginTop={5} marginBottom={5} />

      <Heading as='h2' size='lg'>Account Info</Heading>

      <Box marginTop={2} marginBottom={2}>
        <Text>To get general information about your account (including left jobs and fast-time), use the <Code as='span'>/info</Code> command.</Text>
      </Box>

      <Divider marginTop={5} marginBottom={5} />

      <Heading as='h2' size='lg'>Prompt Parameters</Heading>

      <Box marginTop={2} marginBottom={2}>
        <Text>Midjourney has many settings that you can use directly in the prompts.</Text>
      </Box>

      <Box marginTop={2} marginBottom={2}>
        <Text>Here you will be introduced to the most important ones. You can find a full list on <Link href="https://docs.midjourney.com/docs/parameter-list">https://docs.midjourney.com/docs/parameter-list</Link></Text>
      </Box>

      <Heading as='h3' size='md' marginTop={3}>Aspect Ratio</Heading>
      <Code>--aspect or --ar</Code>
      <Box>By default the images generated by Midjourney have the same height and width. With this parameter, you can have a different height-to-width ratio.</Box>
      <Box>For example:</Box>
      <Code>/imagine a snow leopard in a blizzard --aspect 16:9</Code>
      <Code>/imagine a snow leopard in a blizzard --ar 4:3</Code>

      <Heading as='h3' size='md' marginTop={3}>Negation</Heading>
      <Code>--no</Code>
      <Box>Negative prompts, to avoid having a certain element.</Box>
      <Box>Examples:</Box>
      <Code>/imagine A dog running through a city --no humans</Code>
      <Code>/imagine A rural farm with many animals --no cows</Code>

      <Heading as='h3' size='md' marginTop={3}>Repeat</Heading>
      <Code>--repeat</Code>
      <Box>Use this to run the same job as many times as you like, without having to use the "reroll" button manually. Consider that this will cost you image creation credits for each repetition.</Box>
      <Box>Example:</Box>
      <Code>/imagine An elephant in the savannah --repeat 5</Code>

      <Heading as='h3' size='md' marginTop={3}>Tile</Heading>
      <Code>--tile</Code>
      <Box>If this is enabled, Midjourney will generate images that can be used as tiles, with seamless patterns.</Box>
    </Box>
  )
};