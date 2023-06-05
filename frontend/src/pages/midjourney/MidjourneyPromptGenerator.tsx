import { QuestionIcon } from "@chakra-ui/icons";
import { HStack, Card, CardBody, Button, Input, Tabs, TabList, Tab, TabPanels, TabPanel, VStack, Tooltip, Box, Image, Text, Stack } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react"
import CopyToClipboard from "react-copy-to-clipboard";
import { styleData } from "../../data/styleData";
import { Category } from "../../types";

export const MidjourneyPromptGenerator: FC = () => {
  const [motiveInput, setMotiveInput] = useState("");
  const [activeStylePrompt, setActiveStylePrompt] = useState("");
  const [activeExamplePrompt, setActiveExamplePrompt] = useState<string | null>(null);
  const [selectableStylePrompts, setSelectableStylePrompts] = useState<Array<string>>([]);
  const [generatedPrompt, setGeneratedPrompt] = useState("");

  const defaultExamplePrompt = 'A cat sleeping on a sofa';

  useEffect(
    () => {
      if (motiveInput.trim().length === 0 && activeStylePrompt.trim().length === 0) {
        setGeneratedPrompt('');
        return;
      }

      const promptParts = [];

      promptParts.push(
        motiveInput.trim().length > 0
          ? motiveInput.trim()
          : activeExamplePrompt
            ? activeExamplePrompt
            : defaultExamplePrompt
      );

      if (activeStylePrompt.trim().length > 0) {
        promptParts.push(activeStylePrompt.trim());
      }

      setGeneratedPrompt(promptParts.join(', '));
    },
    [motiveInput, activeStylePrompt, activeExamplePrompt]
  );

  const onStyleButtonClick = (category: Category, prompts: Array<string>) => {
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    setActiveStylePrompt(randomPrompt);
    setSelectableStylePrompts(prompts);
    setActiveExamplePrompt(category.examplePrompt ?? null);
  }

  const onRegenerateClicked = () => {
    const randomPrompt = selectableStylePrompts[Math.floor(Math.random() * selectableStylePrompts.length)];
    setActiveStylePrompt(randomPrompt);
  }

  return (
    <>
      <HStack as="header" position="sticky" width="100%" top={0} zIndex={120}>
        <Card width={"100%"}>
          <CardBody>
            <HStack justifyContent={"space-between"}>
              <Text fontStyle="italic">
                {
                  generatedPrompt.trim().length > 0
                    ? generatedPrompt
                    : 'Your generated prompt will appear here'
                }
              </Text>
              <VStack textAlign="right" alignItems="end">
                <CopyToClipboard text={generatedPrompt}>
                  <Button
                    colorScheme="blue"
                    isDisabled={generatedPrompt?.trim().length === 0}
                  >
                    <Tooltip label="copy">🗋</Tooltip>
                  </Button>
                </CopyToClipboard>
                <Button
                  colorScheme="blue"
                  onClick={onRegenerateClicked}
                  isDisabled={generatedPrompt.length === 0}
                >
                  <Tooltip label="regenerate">⟳</Tooltip>
                </Button>
              </VStack>
            </HStack>
            <Input
              value={motiveInput}
              placeholder="Describe the motive"
              onChange={e => setMotiveInput(e.target.value)}
              mt={"5"}
            />
          </CardBody>
        </Card>
      </HStack>

      <Stack direction={["column-reverse", "column-reverse", "row"]}>
        <Card width={"100%"}>
          <CardBody>

            <Tabs>
              <TabList
                overflowX="scroll"
                overflowY="hidden"
                sx={{
                  scrollbarWidth: 'none',
                  '::-webkit-scrollbar': {
                    display: 'none',
                  },
                }}
              >
                {styleData.map(category => (
                  <Tab key={category.title}>{category.title}</Tab>
                ))}
              </TabList>

              <TabPanels>
                {styleData.map(category => (
                  <TabPanel key={category.title} style={{ paddingLeft: 0, paddingRight: 0 }}>
                    {category.styles.map(style => (
                      <Button
                        key={style.title}
                        colorScheme='blue'
                        onClick={() => onStyleButtonClick(category, style.prompts)}
                        aria-label={style.title}
                        style={{
                          height: 'auto',
                          paddingTop: 15,
                          paddingBottom: 5,
                          marginRight: 10,
                          marginBottom: 10,
                        }}
                      >
                        <VStack>
                          <Image
                            src={style.thumbnail ?? '/not-found-150-150.png'}
                            maxHeight={150}
                            maxWidth={150}
                          />
                          <Text style={{ maxWidth: 150, overflow: "hidden", textOverflow: "ellipsis" }}>
                            {style.title}
                            {style.description && (<>&nbsp;<Tooltip label={style.description}><QuestionIcon /></Tooltip></>)}
                          </Text>
                        </VStack>
                      </Button>
                    ))}
                  </TabPanel>
                ))}
              </TabPanels>
            </Tabs>
          </CardBody>
        </Card>
        <Card width={['100%', '100%', 200]}>
          <CardBody>
            <Box>
              <Text marginBottom={2}>Enter a description of a motive, for example &quot;A cat sleeping on a sofa&quot;.</Text>
              <Text marginBottom={2}>Choose an art style.</Text>
              <Text marginBottom={2}>If you like the generated Midjourney prompts, copy and use it.</Text>
              <Text marginBottom={2}>If not, use the &quot;regenerate&quot; Button, to get a different prompt for the same style.</Text>
            </Box>
          </CardBody>
        </Card>
      </Stack>
    </>
  );

}
