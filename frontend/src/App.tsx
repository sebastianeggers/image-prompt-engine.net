import { Box, Button, Card, CardBody, HStack, Image, Input, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Tooltip, VStack } from "@chakra-ui/react"
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useEffect, useState } from "react";
import { QuestionIcon } from "@chakra-ui/icons";

type Style = {
  title: string,
  thumbnail?: string,
  description?: string,
  prompts: Array<string>,
};

type Category = {
  title: string,
  styles: Array<Style>,
};

const styleData: Array<Category> = [
  {
    title: 'Artists',
    styles: [
      {
        title: 'Picasso',
        thumbnail: 'artists/picasso.jpg',
        prompts: [
          "In the style of Pablo Picasso's blue period, oil on canvas",
          "Abstract cubist interpretation, inspired by Picasso's Guernica",
          "Homage to Picasso's Rose period, vibrant yet harmonious",
          "Inspired by the geometric precision of Picasso's analytic cubism",
          "Synthetist approach influenced by Picasso's Les Demoiselles d'Avignon",
          "Colorful palette, reminiscent of Picasso's Mediterranean Years",
          "Executed in the spirit of Picasso's African Art Period",
          "Mirroring the linear simplicity of Picasso's line drawings",
          "Evocative of Picasso's later surrealist phase, fantastical and uncanny",
          "With the passion and energy of Picasso's Flamenco Dancers",
          "Rendered in the spirit of Picasso's ceramic works",
          "Mirroring the bright palette of Picasso's Vollard Suite",
          "Stylistic interpretation of Picasso's Minotaur mythology series",
          "Referencing the diverse forms in Picasso's The Three Musicians",
          "Incorporating the dramatic lighting of Picasso's Night Fishing at Antibes",
          "A vivid depiction in the style of Picasso's cubist portraits",
          "Styled after Picasso's Weeping Woman, showing raw emotional expression",
          "Visualizing the color and energy of Picasso's Dora Maar portraits",
          "Embodied in the complex geometry of Picasso's synthetic cubism",
          "Motivated by the whimsical, dreamlike nature of Picasso's surrealist period",
          "Inspired by the colorful chaos of Picasso's Guernica",
          "An homage to the disjointed forms in Picasso's cubist sculptures",
          "Composed with the sense of movement present in Picasso's Bull series",
          "Utilizing the sharp lines and monochromatic palette of Picasso's black and white period",
          "Reflective of the simple, flat colors found in Picasso's early work",
          "Abstracted form and bold color, like Picasso's Jacqueline with Flowers",
          "Inspired by the striking visuals of Picasso's The Weeping Woman",
          "Incorporating the fragmented, angular figures of Picasso's Cubist period",
          "Reflecting the soft hues and romanticism of Picasso's Rose period",
          "With the intricate detail and symbolism of Picasso's Las Meninas series",
          "Stylized in the distorted perspective of Picasso's The Dream",
          "Integrating the monochromatic blue tones of Picasso's Blue period",
          "Incorporating the playful form and function of Picasso's ceramic pottery",
          "A bold palette inspired by Picasso's vibrant later works",
          "Hints of the classicism found in Picasso's neoclassical period",
          "Mimicking the bold, definitive lines of Picasso's linocuts",
          "Harnessing the intricate linework of Picasso's etchings",
          "Reflective of the primitive art influences seen in Picasso's work",
          "Absorbing the simple, yet profound strokes of Picasso's single line drawings",
          "With the raw emotion and intensity of Picasso's La Vie",
          "Complementing the rich color palette seen in Picasso's The Reservoir, Horta de Ebro",
          "In the playful and spontaneous style of Picasso's sketches",
          "Incorporating the dramatic shadows and emotional depth of Picasso's Blue period",
          "Using the geometric fragmentation seen in Picasso's Three Musicians",
          "With the strong line work and minimal color of Picasso's monochromatic period",
          "Inspired by the interplay of light and shadow in Picasso's cubist works",
          "Using the structural simplicity and solid colors of Picasso's paper cut-outs",
          "An homage to the transformative geometry of Picasso's Woman in Hat and Fur Collar",
          "Using the curved, organic lines and form of Picasso's Dove of Peace",
          "With the distortion and emotion of Picasso's Woman Weeping.",
        ]
      }
    ],
  },
  {
    title: 'Art Styles',
    styles: [
      {
        title: "Islamic Art",
        description: "Known for its geometric patterns, calligraphy, and intricate designs",
        thumbnail: "artstyles/islamic.jpg",
        prompts: [
          "displaying the intricate geometric patterns and calligraphy characteristic of Islamic art.",
          "reflecting the opulence and complexity found in Islamic decorative art.",
          "with the stylized plant motifs and arabesque designs common in Islamic art.",
          "manifesting the distinct tessellations and detailed calligraphy of Islamic design.",
          "embodying the rich color palette and intricate geometric patterns typical of Islamic art.",
          "embracing the ornate calligraphy and geometric designs characteristic of Islamic art.",
          "showcasing the complex geometric compositions that are a staple of Islamic artistic tradition.",
          "reflecting the symmetrical design and intricate detailing seen in Islamic art.",
          "demonstrating the complex interplay of geometric forms typical of Islamic art.",
          "with the characteristic floral motifs, arabesque designs, and vibrant colors of Islamic art.",
        ],
      },
      {
        title: "Medieval Art",
        description: "A broad term for European art during the Middle Ages, which includes styles like Romanesque and Gothic",
        prompts: [
          "with the iconic narrative scenes and stylized figures characteristic of Medieval art.",
          "presenting the bold colors, gold accents, and religious motifs typical of Medieval art.",
          "capturing the hierarchy of scale and use of symbolic color seen in Medieval art.",
          "with the stark lines, bold colors, and spiritual themes common in Medieval art.",
          "reflecting the gold leaf embellishments and flat, stylized figures of Medieval art.",
          "embodying the iconographic religious scenes and rich colors typical of Medieval art.",
          "manifesting the intricate detailing and narrative storytelling characteristic of Medieval illuminated manuscripts.",
          "featuring the ornate detailing and symbolic iconography seen in Medieval tapestries.",
          "with the distinctive characteristics of Medieval stained glass, showcasing bright colors and biblical narratives.",
          "reflecting the attention to hierarchy and symbolism seen in Medieval frescoes.",
        ],
      },
      {
        title: "Renaissance Art",
        description: "A period of rebirth in interest for classical learning and values, leading to new techniques and subject matter",
        prompts: [
          "with the lifelike figures, atmospheric perspective, and realistic light effects typical of Renaissance art.",
          "demonstrating the careful attention to human anatomy and naturalistic scenery found in Renaissance art.",
          "presenting the delicate brushwork and attention to detail characteristic of Renaissance painting.",
          "embodying the chiaroscuro lighting and realistic portraiture seen in Renaissance art.",
          "reflecting the grandeur and drama of High Renaissance frescoes.",
          "showcasing the luminous color palette and idealized human forms of Renaissance art.",
          "with the richly detailed, carefully composed scenes typical of Renaissance painting.",
          "featuring the use of linear perspective and realistic light and shadow seen in Renaissance art.",
          "capturing the idealized human forms and detailed naturalistic backgrounds of Renaissance art.",
          "embodying the balanced compositions and emotional depth of Renaissance portraiture.",
        ],
      },
      {
        title: "Mannerism",
        description: "A style of late Renaissance art that emphasized artificiality, clashing colors, and elongated figures",
        prompts: [
          "with the elongated forms, complex compositions, and vivid colors characteristic of Mannerism.",
          "displaying the dramatic lighting, intricate detailing, and exaggerated poses typical of Mannerist painting.",
          "reflecting the artistic sophistication and complex emotional content found in Mannerism.",
          "presenting the exaggerated proportions and dynamic compositions characteristic of Mannerist art.",
          "showcasing the heightened drama, complex poses, and intense colors of Mannerist painting.",
          "with the unconventional spatial arrangements and exaggerated emotional states seen in Mannerism.",
          "embodying the disconcerting spatial illusions and elongated figures of Mannerist art.",
          "featuring the vibrant color palette, complex compositions, and distorted perspective of Mannerism.",
          "with the richly detailed, emotionally intense scenes characteristic of Mannerist painting.",
          "capturing the sophisticated compositions and emotional tension typical of Mannerism.",
        ],
      },
      {
        title: "Baroque Art",
        description: "Known for its dramatic lighting, movement, and emotional intensity",
        prompts: [
          "embodying the grandeur, drama, and dynamism typical of Baroque art.",
          "showcasing the extravagant detail and powerful contrasts of light and dark characteristic of Baroque art.",
          "reflecting the theatricality, vivid color, and emotional intensity found in Baroque art.",
          "presenting the complex compositions and dramatic use of light and shadow typical of Baroque painting.",
          "with the detailed textures, rich color palette, and dynamic compositions characteristic of Baroque art.",
          "highlighting the extravagant ornamentation and dramatic lighting effects of Baroque design.",
          "featuring the exaggerated motion and clear, easily interpreted detail found in Baroque art.",
          "capturing the emotional exuberance and grandeur typical of Baroque painting.",
          "with the dramatic play of light and shadow, rich colors, and energetic compositions characteristic of Baroque art.",
          "reflecting the ornate detailing and high drama found in Baroque art.",
        ],
      },
      {
        title: "Rococo Art",
        description: "An ornate, playful style known for pastel colors and delicate details",
        prompts: [
          "embodying the lightness, grace, and playful frivolity typical of Rococo art.",
          "showcasing the pastel color palette and decorative ornamentation characteristic of Rococo art.",
          "reflecting the elegance, charm, and playful use of color found in Rococo art.",
          "presenting the whimsical themes and delicate detailing typical of Rococo painting.",
          "with the intricate ornamentation, light colors, and carefree themes characteristic of Rococo art.",
          "highlighting the decorative elegance and lighthearted subjects of Rococo design.",
          "featuring the ornate detailing, playful themes, and graceful compositions found in Rococo art.",
          "capturing the light color palette, ornamental detailing, and romantic subjects typical of Rococo painting.",
          "with the delicate brushwork, intimate scenes, and pastel colors characteristic of Rococo art.",
          "reflecting the charming frivolity and decorative elegance found in Rococo art.",
        ],
      },
      {
        title: "Neoclassicism",
        description: "Inspired by the \"classical\" art of Greece and Rome, with emphasis on simplicity and symmetry",
        prompts: [
          "embodying the grandeur, clarity, and simplicity typical of Neoclassical art.",
          "showcasing the attention to detail, idealized beauty, and restrained color palette characteristic of Neoclassicism.",
          "reflecting the classical themes, symmetrical compositions, and austere color palette found in Neoclassical art.",
          "presenting the balanced compositions, restrained emotion, and sharp linear techniques typical of Neoclassical painting.",
          "with the dignity, clarity, and restrained emotion characteristic of Neoclassical art.",
          "highlighting the historical subjects, simplicity of form, and idealized beauty of Neoclassical design.",
          "featuring the harmonious proportions, classical themes, and clarity of form found in Neoclassical art.",
          "capturing the grandeur, idealized figures, and calm rationality typical of Neoclassical painting.",
          "with the sharp lines, clear forms, and historical themes characteristic of Neoclassical art.",
          "reflecting the austere color palette, idealized beauty, and rational composition found in Neoclassical art.",
        ],
      },
      {
        title: "Romanticism",
        description: "Characterized by an emphasis on emotion, imagination, and the sublime aspects of nature",
        prompts: [
          "embodying the emotion, drama, and beauty of nature typical of Romantic art.",
          "showcasing the expressive brushwork, vibrant color palette, and dramatic landscapes characteristic of Romanticism.",
          "reflecting the sublime nature scenes, emotional intensity, and heroic themes found in Romantic art.",
          "presenting the dramatic lighting, passionate themes, and grandiose compositions typical of Romantic painting.",
          "with the dynamic compositions, vibrant colors, and focus on individual emotion characteristic of Romantic art.",
          "highlighting the dramatic landscapes, emotional intensity, and focus on the sublime of Romantic design.",
          "featuring the emphasis on the individual, the emotional, and the dramatic found in Romantic art.",
          "capturing the raw emotional expression, atmospheric landscapes, and dramatic lighting typical of Romantic painting.",
          "with the vivid colors, expressive brushwork, and focus on the sublime characteristic of Romantic art.",
          "reflecting the passionate emotion, dramatic landscapes, and vibrant color palette found in Romantic art.",
        ],
      },
      {
        title: "Realism",
        description: "A movement that represented subjects truthfully without artifice or grandiosity",
        prompts: [
          "embodying the truthful, unidealized depiction typical of Realist art.",
          "showcasing the attention to detail, accurate color, and ordinary subject matter characteristic of Realism.",
          "reflecting the accurate representation of light, detailed textures, and ordinary life found in Realist art.",
          "presenting the unvarnished truth, minute detail, and absence of romanticization typical of Realist painting.",
          "with the naturalistic colors, true-to-life textures, and focus on common people characteristic of Realist art.",
          "highlighting the everyday subjects, accurate anatomy, and lack of idealization in Realist design.",
          "featuring the unidealized forms, accurate proportions, and mundane scenes found in Realist art.",
          "capturing the truthfulness, objective observation, and representation of everyday life typical of Realist painting.",
          "with the realistic lighting, authentic depiction of subjects, and emphasis on the ordinary characteristic of Realist art.",
          "reflecting the honest representation, everyday subjects, and absence of exaggeration found in Realist art.",
        ],
      },
      {
        title: "Impressionism",
        description: "Known for capturing the fleeting effects of light and color, often outdoors",
        prompts: [
          "embodying the fleeting light, loose brushwork, and everyday scenes typical of Impressionist art.",
          "showcasing the vibrant color palette, visible brushstrokes, and emphasis on light characteristic of Impressionism.",
          "reflecting the transient effects of light, quick, loose brushwork, and open composition found in Impressionist art.",
          "presenting the emphasis on color and light, outdoor scenes, and candid poses typical of Impressionist painting.",
          "with the atmospheric effects, sense of movement, and ordinary subject matter characteristic of Impressionist art.",
          "highlighting the fleeting moments, visible brushwork, and light-infused color in Impressionist design.",
          "featuring the vibrant colors, open compositions, and informal subjects found in Impressionist art.",
          "capturing the transient light, sketch-like style, and simultaneous contrast of colors typical of Impressionist painting.",
          "with the visible brushstrokes, vibrant colors, and emphasis on the effects of light characteristic of Impressionist art.",
          "reflecting the light-infused color, outdoor scenes, and visible brushstrokes found in Impressionist art.",
        ],
      },
      {
        title: "Post-Impressionism",
        description: "Varied styles that all sought to build upon or react against Impressionism, including artists like Van Gogh and Gauguin",
        prompts: [
          "embodying the vibrant colors, thick application of paint, and subjective emotions typical of Post-Impressionist art.",
          "showcasing the symbolic colors, emotional expressivity, and geometric forms characteristic of Post-Impressionism.",
          "reflecting the emotional resonance, experimentation with form, and unnatural color found in Post-Impressionist art.",
          "presenting the personal expression, emotional color, and distorted forms typical of Post-Impressionist painting.",
          "with the expressive brushstrokes, subjective symbolism, and experimental compositions characteristic of Post-Impressionist art.",
          "highlighting the individual perspective, symbolic color, and emotional intensity in Post-Impressionist design.",
          "featuring the emotional color, bold forms, and personal interpretation found in Post-Impressionist art.",
          "capturing the intense color, emotional expressivity, and abstracted forms typical of Post-Impressionist painting.",
          "with the visible brushstrokes, emotional resonance, and geometric simplicity characteristic of Post-Impressionist art.",
          "reflecting the personal symbolism, vibrant color, and experimentation with form found in Post-Impressionist art.",
        ],
      },
      {
        title: "Symbolism",
        description: "A late 19th-century movement characterized by an emphasis on emotions and ideas, often using symbolic imagery",
        prompts: [
          "embodying the mysterious, symbol-laden, and spiritual aspects typical of Symbolist art.",
          "showcasing the allegorical imagery, subjective emotions, and symbolic color characteristic of Symbolism.",
          "reflecting the dreamlike scenes, symbolic motifs, and emotional resonance found in Symbolist art.",
          "presenting the metaphorical imagery, spiritual themes, and symbolic forms typical of Symbolist painting.",
          "with the mystical symbols, dream-like scenes, and introspective emotion characteristic of Symbolist art.",
          "highlighting the symbolic narrative, personal mythologies, and suggestive forms in Symbolist design.",
          "featuring the spiritual undertones, allegorical imagery, and subjective emotions found in Symbolist art.",
          "capturing the metaphysical symbols, subjective reality, and mystical themes typical of Symbolist painting.",
          "with the symbolic narrative, allegorical motifs, and introspective emotion characteristic of Symbolist art.",
          "reflecting the dreamlike scenarios, symbolic narrative, and personal mythologies found in Symbolist art.",
        ],
      },
      {
        title: "Art Nouveau",
        description: "Characterized by its use of long, sinuous, organic lines and was employed most often in architecture, interior design, jewelry, and glass design",
        prompts: [
          "embodying the organic forms, decorative motifs, and curved lines typical of Art Nouveau.",
          "showcasing the stylized nature motifs, flowing lines, and intricate details characteristic of Art Nouveau.",
          "reflecting the sensuous lines, decorative elements, and natural themes found in Art Nouveau.",
          "presenting the intricate ornamentation, stylized plants, and elegant lines typical of Art Nouveau.",
          "with the organic shapes, intricate ornamentation, and whiplash curves characteristic of Art Nouveau.",
          "highlighting the sinuous lines, botanical motifs, and dynamic forms in Art Nouveau design.",
          "featuring the flowing lines, ornamental detailing, and nature-inspired elements found in Art Nouveau.",
          "capturing the decorative style, stylized organic forms, and curvilinear designs typical of Art Nouveau.",
          "with the sinuous lines, organic motifs, and decorative elegance characteristic of Art Nouveau.",
          "reflecting the nature-inspired motifs, intricate ornamentation, and flowing lines found in Art Nouveau.",
        ],
      },
      {
        title: "Fauvism",
        description: "A style of painting with vibrant, non-naturalistic and exuberant colors",
        prompts: [
          "embodying the vibrant color, simplified shapes, and emotional expressiveness typical of Fauvist art.",
          "showcasing the non-naturalistic colors, bold brushwork, and simplification of form characteristic of Fauvism.",
          "reflecting the emotional color, abstracted forms, and bold expressivity found in Fauvist art.",
          "presenting the expressive color, simplified shapes, and non-representational forms typical of Fauvist painting.",
          "with the intense color palette, simplified forms, and bold brushwork characteristic of Fauvist art.",
          "highlighting the subjective color, bold lines, and flat shapes in Fauvist design.",
          "featuring the vibrant colors, simplified shapes, and emotional expressivity found in Fauvist art.",
          "capturing the bold color contrasts, simplified forms, and wild brushwork typical of Fauvist painting.",
          "with the intense color palette, simplified forms, and flat areas of color characteristic of Fauvist art.",
          "reflecting the non-representational color, simplified shapes, and emotional intensity found in Fauvist art.",
        ],
      },
      {
        title: "Expressionism",
        description: "A style that seeks to express emotional experience rather than impressions of the external world",
        prompts: [
          "evoking the emotional intensity, subjective perspectives, and distorted forms typical of Expressionist art.",
          "showcasing the raw emotion, distorted reality, and vivid colors characteristic of Expressionism.",
          "reflecting the emotional turmoil, subjective interpretations, and dramatic forms found in Expressionist art.",
          "presenting the distorted perspectives, intense emotion, and vibrant colors typical of Expressionist painting.",
          "with the bold brushwork, subjective expression, and emotional intensity characteristic of Expressionist art.",
          "highlighting the psychological depth, emotional tension, and vivid color contrasts in Expressionist design.",
          "featuring the emotional expressiveness, exaggerated forms, and dramatic colors found in Expressionist art.",
          "capturing the inner emotional experience, distorted forms, and intense colors typical of Expressionist painting.",
          "with the stark contrasts, intense emotionality, and dramatic distortions characteristic of Expressionist art.",
          "reflecting the emotional resonance, subjective realities, and distorted shapes found in Expressionist art.",
        ],
      },
      {
        title: "Cubism",
        description: "A revolutionary style of art created by Picasso and Braque that represented objects from multiple viewpoints",
        prompts: [
          "embodying the fragmented forms, multiple perspectives, and abstract shapes typical of Cubist art.",
          "showcasing the geometric abstraction, multiple viewpoints, and simplified forms characteristic of Cubism.",
          "reflecting the abstracted forms, interlocking planes, and fragmented reality found in Cubist art.",
          "presenting the geometric shapes, multiple perspectives, and simplified forms typical of Cubist painting.",
          "with the fragmented reality, geometric abstraction, and multiple viewpoints characteristic of Cubist art.",
          "highlighting the intersecting planes, simplified forms, and abstracted representation in Cubist design.",
          "featuring the abstracted forms, geometric shapes, and fragmented representation found in Cubist art.",
          "capturing the multiple perspectives, geometric abstraction, and simplified forms typical of Cubist painting.",
          "with the abstracted reality, fragmented forms, and geometric shapes characteristic of Cubist art.",
          "reflecting the multiple viewpoints, abstracted forms, and geometric abstraction found in Cubist art.",
        ],
      },
      {
        title: "Futurism",
        description: "An art movement that emphasized speed, technology, youth, and violence, and objects such as the car, the airplane, and the industrial city",
        prompts: [
          "embodying the dynamic movement, speed, and energy typical of Futurist art.",
          "showcasing the fragmented forms, technological themes, and sense of movement characteristic of Futurism.",
          "reflecting the kinetic energy, technology-inspired motifs, and fragmented reality found in Futurist art.",
          "presenting the sense of speed, dynamic forms, and technological themes typical of Futurist painting.",
          "with the dynamic movement, fragmented forms, and emphasis on technology characteristic of Futurist art.",
          "highlighting the kinetic energy, geometric forms, and forward-thinking themes in Futurist design.",
          "featuring the dynamic movement, technological motifs, and fragmented forms found in Futurist art.",
          "capturing the sense of speed, dynamic shapes, and emphasis on modern technology typical of Futurist painting.",
          "with the futuristic themes, kinetic energy, and fragmented forms characteristic of Futurist art.",
          "reflecting the sense of movement, geometric abstraction, and technological themes found in Futurist art.",
        ],
      },
      {
        title: "Dada",
        description: "A movement that questioned long-held assumptions about art, and sought to create anti-art that could defy the expectations of the art establishment",
        prompts: [
          "embodying the nonsensical, ironic, and disruptive style typical of Dada art.",
          "showcasing the absurd, provocative, and anti-establishment themes characteristic of Dada.",
          "reflecting the random, anti-art, and satirical nature found in Dada art.",
          "presenting the humorously absurd, iconoclastic, and shockingly provocative elements typical of Dada art.",
          "with the chance elements, anti-establishment themes, and provocative absurdity characteristic of Dada art.",
          "highlighting the playful nonsense, disruptive tactics, and anti-art themes in Dada design.",
          "featuring the ironic humor, anti-establishment messages, and absurdist elements found in Dada art.",
          "capturing the chaotic randomness, provocative absurdity, and anti-art approach typical of Dada art.",
          "with the anarchic spirit, nonsensical elements, and provocative anti-art themes characteristic of Dada art.",
          "reflecting the randomness, ironic humor, and disruptive attitude found in Dada art.",
        ],
      },
      {
        title: "Surrealism",
        description: "A movement that sought to explore the irrational, dream-like, and bizarre aspects of the mind",
        prompts: [
          "embodying the dreamlike, illogical, and uncanny style typical of Surrealist art.",
          "showcasing the subconscious-inspired, bizarre, and fantastical themes characteristic of Surrealism.",
          "reflecting the dreamlike scenarios, absurd juxtapositions, and surrealist transformations found in Surrealist art.",
          "presenting the unusual, subconscious-inspired, and bizarre elements typical of Surrealist art.",
          "with the dream-inspired scenes, unexpected juxtapositions, and uncanny elements characteristic of Surrealist art.",
          "highlighting the dream logic, strange scenarios, and fantastical elements in Surrealist design.",
          "featuring the subconscious themes, bizarre juxtapositions, and fantastical transformations found in Surrealist art.",
          "capturing the uncanny, dreamlike scenarios, and illogical elements typical of Surrealist art.",
          "with the bizarre, subconscious-driven, and dreamlike themes characteristic of Surrealist art.",
          "reflecting the strange juxtapositions, dream-inspired elements, and uncanny scenarios found in Surrealist art.",
        ],
      },
      {
        title: "Abstract Expressionism",
        description: "A post-World War II art movement that emphasized expressive, abstract qualities",
        prompts: [
          "embodying the spontaneous, emotive, and non-objective style typical of Abstract Expressionist art.",
          "showcasing the expressive brushwork, abstracted forms, and emotional intensity characteristic of Abstract Expressionism.",
          "reflecting the gestural abstraction, emotive intensity, and non-representational nature found in Abstract Expressionist art.",
          "presenting the free-form abstraction, emotional depth, and spontaneous brushwork typical of Abstract Expressionist art.",
          "with the expressive abstraction, emotional intensity, and non-objective forms characteristic of Abstract Expressionist art.",
          "highlighting the emotive brushwork, abstract forms, and gestural expression in Abstract Expressionist design.",
          "featuring the spontaneous gestures, emotional intensity, and abstracted forms found in Abstract Expressionist art.",
          "capturing the non-objective forms, expressive abstraction, and emotional depth typical of Abstract Expressionist art.",
          "with the emotional intensity, gestural abstraction, and non-representational forms characteristic of Abstract Expressionist art.",
          "reflecting the spontaneous brushwork, abstracted forms, and emotional depth found in Abstract Expressionist art.",
        ],
      },
      {
        title: "Pop Art",
        description: "Art that uses elements of popular culture, often to critique or examine these elements in new, unexpected ways",
        prompts: [
          "embodying the vibrant, consumer culture-inspired, and iconic style typical of Pop Art.",
          "showcasing the mass media imagery, bold colors, and kitschy themes characteristic of Pop Art.",
          "reflecting the consumer goods, celebrity culture, and vibrant colors found in Pop Art.",
          "presenting the iconic symbols, bold color palette, and kitschy elements typical of Pop Art.",
          "with the advertising-inspired motifs, bright colors, and iconic images characteristic of Pop Art.",
          "highlighting the pop culture symbols, vibrant colors, and kitschy themes in Pop Art design.",
          "featuring the consumer culture motifs, bold colors, and iconic imagery found in Pop Art.",
          "capturing the kitschy elements, bold color palette, and consumer goods typical of Pop Art.",
          "with the celebrity culture motifs, vibrant colors, and mass media themes characteristic of Pop Art.",
          "reflecting the iconic symbols, kitschy elements, and bold colors found in Pop Art.",
        ],
      },
      {
        title: "Minimalism",
        description: "A movement that sought to strip down art to its basic, essential elements",
        prompts: [
          "embodying the pared-down, geometric, and monochromatic style typical of Minimalist art.",
          "showcasing the simplicity, reduced forms, and clean lines characteristic of Minimalism.",
          "reflecting the geometric forms, stripped-down aesthetics, and monochromatic color schemes found in Minimalist art.",
          "presenting the clean lines, simplified shapes, and minimal color palette typical of Minimalist art.",
          "with the unadorned forms, monochromatic colors, and clean aesthetics characteristic of Minimalism.",
          "highlighting the simplified shapes, minimal aesthetics, and clean lines in Minimalist design.",
          "featuring the geometric forms, pared-down aesthetics, and monochromatic color schemes found in Minimalist art.",
          "capturing the clean aesthetics, simplified forms, and minimal color palette typical of Minimalist art.",
          "with the reduced forms, clean lines, and pared-down aesthetics characteristic of Minimalism.",
          "reflecting the monochromatic colors, geometric shapes, and simplified aesthetics found in Minimalist art.",
        ],
      },
      {
        title: "Conceptual Art",
        description: "Art where the idea or concept is the most important aspect of the work",
        prompts: [
          "embodying the idea-driven, challenging, and unconventional style typical of Conceptual art.",
          "showcasing the intellectual exploration, unconventional mediums, and thought-provoking themes characteristic of Conceptual Art.",
          "reflecting the idea over form, intellectual provocation, and challenging norms found in Conceptual art.",
          "presenting the thought-provoking ideas, unconventional presentation, and intellectual exploration typical of Conceptual art.",
          "with the challenge to traditional art forms, intellectual depth, and provocative ideas characteristic of Conceptual Art.",
          "highlighting the idea-driven exploration, challenging norms, and unconventional mediums in Conceptual Art design.",
          "featuring the thought-provoking ideas, intellectual challenge, and unconventional mediums found in Conceptual art.",
          "capturing the challenging of norms, idea over form, and intellectual provocation typical of Conceptual Art.",
          "with the unconventional presentation, thought-provoking themes, and idea-driven approach characteristic of Conceptual Art.",
          "reflecting the intellectual exploration, unconventional mediums, and provocative ideas found in Conceptual Art.",
        ],
      },
      {
        title: "Op Art",
        description: "Art that exploits optical illusions to make the viewer see movement or color changes",
        prompts: [
          "showcasing the optical illusions, contrasting colors, and geometric shapes typical of Op Art.",
          "embracing the dizzying patterns, black and white contrast, and hypnotic illusions found in Op Art.",
          "exemplifying the vibrant patterns, illusionistic effects, and kinetic aesthetics inherent in Op Art.",
          "featuring the geometric abstraction, interactive effects, and high contrast typical of Op Art.",
          "presenting the repetitive forms, perceptual illusions, and stark black and white contrasts characteristic of Op Art.",
          "capturing the optical effects, geometric designs, and visual vibrations typical of Op Art.",
          "embracing the vibrational aesthetics, contrasting hues, and abstract patterns found in Op Art.",
          "reflecting the spatial illusions, vibrant patterns, and kinetic sensations inherent in Op Art.",
          "representing the hypnotic illusions, geometric shapes, and intense contrast typical of Op Art.",
          "embodying the dizzying patterns, visual vibrations, and optical illusions characteristic of Op Art.",
        ],
      },
      {
        title: "Photorealism",
        description: "Art that emulates the style of high-resolution photography",
        prompts: [
          "adhering to the high-resolution detail, photographic accuracy, and exact rendering typical of Photorealism.",
          "showcasing the meticulous detail, exactitude, and high-definition clarity characteristic of Photorealism.",
          "embracing the photographic likeness, crisp detail, and exact representation inherent in Photorealism.",
          "featuring the high-definition clarity, meticulous attention to detail, and photographic accuracy typical of Photorealism.",
          "representing the razor-sharp detail, photographic likeness, and exact rendering characteristic of Photorealism.",
          "capturing the high-resolution accuracy, lifelike representation, and sharp detail typical of Photorealism.",
          "reflecting the crisp detail, exact representation, and high-definition clarity inherent in Photorealism.",
          "presenting the meticulous detail, photographic accuracy, and lifelike representation characteristic of Photorealism.",
          "embodying the razor-sharp detail, high-resolution accuracy, and exact rendering typical of Photorealism.",
          "exemplifying the high-definition clarity, photographic likeness, and meticulous attention to detail characteristic of Photorealism.",
        ],
      },
      {
        title: "Street Art",
        description: "Visual art created in public locations, often unsanctioned but gaining mainstream acceptance over time",
        prompts: [
          "showcasing the vibrant colors, bold lines, and public commentary typical of Street Art.",
          "embracing the urban aesthetics, graffiti elements, and large-scale murals found in Street Art.",
          "featuring the stenciled images, politically charged themes, and layered graffiti typical of Street Art.",
          "representing the vibrant spray paint, bold imagery, and public setting characteristic of Street Art.",
          "capturing the raw energy, subversive themes, and concrete canvas typical of Street Art.",
          "reflecting the pop-culture references, aerosol art, and rebellious spirit inherent in Street Art.",
          "presenting the expressive typography, large-scale murals, and vivid color palette characteristic of Street Art.",
          "embodying the graffiti style, urban context, and vibrant spray paint typical of Street Art.",
          "exemplifying the rebellious themes, public messages, and raw aesthetics characteristic of Street Art.",
          "showcasing the large-scale murals, pop-culture imagery, and vibrant color typical of Street Art.",
        ],
      },
      {
        title: "Postmodern Art",
        description: "An art movement that arose in the second half of the 20th century as a reaction against modernist formalism",
        prompts: [
          "featuring the playful irony, appropriation of pop culture, and challenge to traditional narratives characteristic of Postmodern Art.",
          "showcasing the eclectic mix of styles, questioning of authority, and self-referential nature typical of Postmodern Art.",
          "capturing the intertextuality, cultural criticism, and collage-like aesthetics typical of Postmodern Art.",
          "reflecting the parody of high culture, subversion of conventions, and pastiche typical of Postmodern Art.",
          "embodying the deconstruction of ideas, fragmentation of forms, and irreverence towards tradition characteristic of Postmodern Art.",
          "presenting the parody of classic forms, focus on marginalized voices, and rejection of universal truths inherent in Postmodern Art.",
          "representing the hybrid aesthetics, blending of high and low culture, and tongue-in-cheek commentary typical of Postmodern Art.",
          "exemplifying the subversion of expectations, ironic use of popular culture, and critique of modernist purity inherent in Postmodern Art.",
          "highlighting the questioning of grand narratives, deconstruction of familiar forms, and blurring of genre boundaries characteristic of Postmodern Art.",
          "exploring the pastiche of styles, intertextual references, and subversive humor typical of Postmodern Art.",
        ],
      },
      {
        title: "Digital Art",
        description: "Art that uses digital technology as an essential part of the creative or presentation process",
        prompts: [
          "capturing the high-resolution textures, digital manipulation, and virtual aesthetics characteristic of Digital Art.",
          "showcasing the pixelated detail, software-driven creativity, and vibrant color range inherent in Digital Art.",
          "featuring the innovative use of software, digital brushstrokes, and technologically inspired themes typical of Digital Art.",
          "reflecting the hyper-realistic rendering, virtual 3D environments, and dynamic layers typical of Digital Art.",
          "presenting the smooth gradients, vector-based designs, and digital photomanipulation inherent in Digital Art.",
          "embracing the pixel art styles, algorithmic patterns, and complex digital textures typical of Digital Art.",
          "representing the high-definition detail, virtual sculpting, and data-driven aesthetics characteristic of Digital Art.",
          "embodying the blend of virtual reality, artificial intelligence, and generative aesthetics typical of Digital Art.",
          "exemplifying the computer-generated graphics, digital collage, and interactive elements inherent in Digital Art.",
          "highlighting the computational creativity, augmented reality components, and digital abstraction typical of Digital Art.",
        ],
      },
      {
        title: "Anime Art",
        prompts: [
          "showcasing the exaggerated facial expressions, vibrant color palette, and dynamic action scenes typical of Anime Art.",
          "capturing the detailed backgrounds, stylized character designs, and dramatic lighting characteristic of Anime Art.",
          "featuring the cel-shaded styles, large expressive eyes, and imaginative world-building typical of Anime Art.",
          "embodying the unique blend of realism and fantasy, emotion-driven narratives, and iconic visual tropes inherent in Anime Art.",
          "reflecting the fluid animation, stylized hair and clothing, and culturally specific settings typical of Anime Art.",
          "presenting the signature character archetypes, high-energy action sequences, and dramatic angles inherent in Anime Art.",
          "representing the distinct aesthetics of manga-inspired designs, vivid colors, and dynamic compositions typical of Anime Art.",
          "emphasizing the variety of art styles, emotion-focused storytelling, and culturally influenced settings characteristic of Anime Art.",
          "highlighting the blend of traditional and modern aesthetics, iconic character designs, and visually stunning effects inherent in Anime Art.",
          "illustrating the manga-style linework, vibrant color schemes, and immersive world-building typical of Anime Art.",
        ]
      }
    ]
  },
  {
    title: 'Art Techniques',
    styles: [
      {
        title: "Chiaroscuro",
        thumbnail: "techniques/chiaroscuro.png",
        prompts: [
          "Using the deep contrast technique of Chiaroscuro",
          "Emphasizing light and shadow in a Chiaroscuro style",
          "Harnessing the dramatic intensity of Chiaroscuro",
          "Incorporating the sharp contrast and depth of Chiaroscuro",
          "Drawing inspiration from the boldness of Chiaroscuro",
          "Infused with the stark light-dark contrast of Chiaroscuro",
          "Embodying the timeless technique of Chiaroscuro",
          "Mirroring the intense contrasts of Chiaroscuro",
          "Showcasing the interplay of light and shadow, Chiaroscuro",
          "Utilizing the dramatic lighting techniques of Chiaroscuro",
          "Playing with light and darkness in a Chiaroscuro approach",
          "The sharp dichotomy of light and shadow as in Chiaroscuro",
          "Incorporating the dramatic intensity of Chiaroscuro",
          "With the depth and dimension of Chiaroscuro",
          "Using the tonal contrasts characteristic of Chiaroscuro",
          "With the high-contrast aesthetics of Chiaroscuro",
          "Featuring the stunning contrast and depth of Chiaroscuro",
          "The stark contrast of light and shadow as in Chiaroscuro",
          "Chiaroscuro's play of shadow and light",
          "Embracing the deep contrasts of Chiaroscuro",
        ],
      },
      {
        title: "Sfumato",
        thumbnail: "techniques/sfumato.jpg",
        prompts: [
          "Utilizing the soft transitions of Sfumato",
          "Incorporating the subtle gradation of tones, Sfumato",
          "In the smooth blending style of Sfumato",
          "With the hazy, dreamlike technique of Sfumato",
          "Infused with the delicate subtlety of Sfumato",
          "Rendering with the soft shading characteristic of Sfumato",
          "Incorporating the seamless transitions of Sfumato",
          "Exploring the soft edges and blurred lines of Sfumato",
          "Implementing the soft and delicate gradients of Sfumato",
          "Employing the subtle blending and soft transitions of Sfumato",
          "With the softened outlines and blurred shadows of Sfumato",
          "Using the subtle transitions between colors, Sfumato",
          "Rendered with the smokey, blurred lines of Sfumato",
          "Mirroring the smooth blending techniques of Sfumato",
          "With the delicate tonal transitions of Sfumato",
          "Using the smooth, blurred technique of Sfumato",
          "Subtle gradation of tones in the style of Sfumato",
          "The smokey effect and smooth gradation of Sfumato",
          "Soft transitions and blurred edges in a Sfumato style",
          "Implementing the soft blending techniques of Sfumato",
        ],
      },
      {
        title: "Impasto",
        thumbnail: "techniques/impasto.png",
        prompts: [
          "Incorporating the thick, textured strokes of Impasto",
          "With the rich, tactile surface of Impasto",
          "The thick, bold brushwork of Impasto",
          "Utilizing the dense texture and volume of Impasto",
          "Mirroring the bold relief-like structure of Impasto",
          "Using the dynamic, sculptural technique of Impasto",
          "Incorporating the three-dimensional aspect of Impasto",
          "Embracing the rich texture and depth of Impasto",
          "Infusing the dimensional brushwork of Impasto",
          "With the bold and expressive technique of Impasto",
          "Featuring the raised texture and dynamic strokes of Impasto",
          "Exploring the tactile dimension of Impasto",
          "The thick, pronounced brushwork characteristic of Impasto",
          "Rendered with the bold, textured strokes of Impasto",
          "Mirroring the sculptural quality of Impasto",
          "With the tactile and voluminous technique of Impasto",
          "Using the heavy, texture-creating technique of Impasto",
          "Embodying the high relief and texture of Impasto",
          "The deep texture and volume characteristic of Impasto",
          "Evoking the heavy brushwork of Impasto",
        ],
      },
      {
        title: "Glazing",
        thumbnail: "techniques/glazing.png",
        prompts: [
          "Using the luminous layering technique of Glazing",
          "With the depth and vibrancy of Glazing",
          "Incorporating the subtle tonal shifts of Glazing",
          "Showcasing the unique depth and luminosity of Glazing",
          "Using the color-enhancing technique of Glazing",
          "The reflective surfaces and deep colors of Glazing",
          "Incorporating the rich, layered effect of Glazing",
          "With the layered transparency of Glazing",
          "Rendered with the lustrous finish of Glazing",
          "Utilizing the transparent layering of Glazing",
          "Embracing the depth and sheen of Glazing",
          "With the layered depth and luminosity of Glazing",
          "The smooth, shiny finish characteristic of Glazing",
          "Implementing the luminous layering of Glazing",
          "Evoking the shiny, layered effect of Glazing",
          "The tonal depth and glossiness of Glazing",
          "Employing the rich, glossy finish of Glazing",
          "The layered transparency and luminosity of Glazing",
          "With the glossy sheen and depth of Glazing",
          "Featuring the rich, layered transparency of Glazing",
        ],
      },
      {
        title: "Grattage",
        thumbnail: "techniques/grattage.png",
        prompts: [
          "Incorporating the textural scraping technique of Grattage",
          "With the textured surfaces and layered depth of Grattage",
          "Using the subtractive, texture-enhancing technique of Grattage",
          "Showcasing the unique textural quality of Grattage",
          "Embodying the physical manipulation of surface in Grattage",
          "Implementing the textural surface scraping of Grattage",
          "Using the scratchy, textured surface of Grattage",
          "Harnessing the unique textural effects of Grattage",
          "With the scraped and textured feel of Grattage",
          "Infused with the rugged surface textures of Grattage",
          "Employing the technique of surface scraping, Grattage",
          "Exploring the texture and depth through Grattage",
          "Mirroring the raw, textured feel of Grattage",
          "Creating textural interest through the method of Grattage",
          "Embracing the textural depth and scraped surfaces of Grattage",
          "With the rough and deeply textured technique of Grattage",
          "Rendering with the subtractive scraping technique of Grattage",
          "The textured and scraped surfaces characteristic of Grattage",
          "Infusing the raw texture and depth of Grattage",
          "Employing the textural scraping and layered depth of Grattage",
        ]
      },
      {
        title: "Tenebrism",
        thumbnail: "techniques/tenebrism.png",
        prompts: [

          "intense shadows of Tenebrism.",
          "dramatic contrast and deep shadows characteristic of Tenebrism.",
          "extreme light-dark contrast of Tenebrism.",
          "harsh chiaroscuro of Tenebrism.",
          "dark dramatic tones of Tenebrism.",
          "sharp contrast between light and dark as in Tenebrism.",
          "with the intense shadows and highlights of Tenebrism.",
          "extreme contrast and dramatic lighting of Tenebrism.",
          "the dramatic and stark shadows of Tenebrism.",
          "stark lighting and deep shadows characteristic of Tenebrism.",
          "Employing the harsh contrast and extreme lighting of Tenebrism.",
          "Infusing the high contrast and dramatic shadows of Tenebrism.",
          "sharp contrast and deep shadows characteristic of Tenebrism.",
          "stark lighting and dramatic shadows of Tenebrism.",
          "intense light-dark contrast technique of Tenebrism.",
          "stark contrast and dramatic lighting of Tenebrism.",
          "intense chiaroscuro of Tenebrism.",
          "extreme contrast and dramatic lighting of Tenebrism.",
          "harsh light-dark contrast of Tenebrism.",
          "the dramatic tones of Tenebrism.",

        ]
      },
      {
        title: "Fresco",
        thumbnail: "techniques/fresco.png",
        prompts: [

          "textured, vibrant technique of Fresco.",
          "rich, lasting color of Fresco.",
          "fresh, vibrant look of Fresco.",
          "Rendering with the lush color and texture of Fresco.",
          "With the enduring color and rough texture characteristic of Fresco.",
          "vibrant color and unique texture of Fresco.",
          "Infusing the durable color and textural depth of Fresco.",
          "fresh, rich color technique of Fresco.",
          "Harnessing the enduring quality and vibrant color of Fresco.",
          "bright, durable color and texture of Fresco.",
          "With the lasting color and unique texture of Fresco.",
          "Drawing inspiration from the vibrant color and texture of Fresco.",
          "Using the vibrant and long-lasting color technique of Fresco.",
          "Embodying the unique texture and enduring color of Fresco.",
          "fresh, vibrant color and texture of Fresco.",
          "The rich color and unique texture characteristic of Fresco.",
          "Rendering with the vibrant and lasting color technique of Fresco.",
          "enduring color and unique texture of Fresco.",
          "rich, durable color of Fresco.",
          "The fresh, vibrant color and unique texture of Fresco.",

        ]
      },
      {
        title: "Grisaille",
        thumbnail: "techniques/grisaille.png",
        prompts: [

          "Using the grayscale technique of Grisaille.",
          "monochrome shading of Grisaille.",
          "nuanced tones of Grisaille.",
          "Rendering with the grayscale nuances of Grisaille.",
          "With the monochromatic depth and shading characteristic of Grisaille.",
          "grayscale depth and nuance of Grisaille.",
          "Infusing the monochrome shading and depth of Grisaille.",
          "grayscale depth and nuanced shading of Grisaille.",
          "Harnessing the depth and nuance of Grisaille's grayscale.",
          "monochrome depth and shading of Grisaille.",
          "With the grayscale nuances and depth characteristic of Grisaille.",
          "Drawing inspiration from the monochrome depth and nuance of Grisaille.",
          "Using the monochromatic depth and nuanced shading of Grisaille.",
          "Embodying the grayscale depth and nuanced shading of Grisaille.",
          "nuanced tones and depth of Grisaille.",
          "The grayscale depth and nuanced shading characteristic of Grisaille.",
          "Rendering with the grayscale nuances of Grisaille.",
          "monochrome depth and nuanced shading of Grisaille.",
          "nuanced tones of Grisaille.",
          "The monochrome depth and nuanced shading of Grisaille.",

        ]
      },
      {
        title: "Encaustic",
        thumbnail: "techniques/encaustic.png",
        prompts: [

          "Using the richly textured technique of Encaustic.",
          "warm tones and texture of Encaustic.",
          "layered depth of Encaustic.",
          "Rendering with the thick textures and warm tones of Encaustic.",
          "With the rich textures and depth characteristic of Encaustic.",
          "layered textures and warmth of Encaustic.",
          "Infusing the depth and rich texture of Encaustic.",
          "layered depth and warmth of Encaustic.",
          "Harnessing the thick textures and warm tones of Encaustic.",
          "rich textures and depth of Encaustic.",
          "With the warmth and depth characteristic of Encaustic.",
          "Drawing inspiration from the rich textures and depth of Encaustic.",
          "Using the warm tones and rich textures of Encaustic.",
          "Embodying the depth and rich texture of Encaustic.",
          "warm tones and layered depth of Encaustic.",
          "The rich textures and warmth characteristic of Encaustic.",
          "Rendering with the thick textures and warmth of Encaustic.",
          "layered depth and warmth of Encaustic.",
          "rich textures and depth of Encaustic.",
          "The warmth and depth characteristic of Encaustic.",

        ]
      },
      {
        title: "Pointillism",
        thumbnail: "techniques/pointillism.png",
        prompts: [

          "Using the dot-based technique of Pointillism.",
          "vibrant dots and depth of Pointillism.",
          "separate, colored dots of Pointillism.",
          "Rendering with the distinct dots and vibrant colors of Pointillism.",
          "With the colorful dots and depth characteristic of Pointillism.",
          "distinct, colored dots and depth of Pointillism.",
          "Infusing the vibrant colors and depth of Pointillism.",
          "distinct dots and vibrant colors of Pointillism.",
          "Harnessing the colorful dots and depth of Pointillism.",
          "distinct dots and vibrant colors of Pointillism.",
          "With the distinct, colored dots characteristic of Pointillism.",
          "Drawing inspiration from the colorful dots and depth of Pointillism.",
          "Using the distinct dots and vibrant colors of Pointillism.",
          "Embodying the depth and distinct, colored dots of Pointillism.",
          "vibrant dots and depth of Pointillism.",
          "The colorful dots and depth characteristic of Pointillism.",
          "Rendering with the distinct dots and vibrant colors of Pointillism.",
          "vibrant dots and depth of Pointillism.",
          "distinct dots and vibrant colors of Pointillism.",
          "The vibrant dots and depth characteristic of Pointillism.",
        ],
      },
      {
        title: "Hatching",
        thumbnail: "techniques/hatching.png",
        prompts: [
          "Using the line-oriented technique of Hatching.",
          "parallel line technique of Hatching.",
          "sketchy texture of Hatching.",
          "Rendering with the rhythmic lines of Hatching.",
          "With the dense linear work characteristic of Hatching.",
          "parallel lines and shading of Hatching.",
          "Infusing the linear rhythm and depth of Hatching.",
          "line-based shading technique of Hatching.",
          "Harnessing the texture and rhythm of Hatching.",
          "parallel lines and tonal gradation of Hatching.",
          "Drawing inspiration from the linear shading and texture of Hatching.",
          "Using the line-oriented shading technique of Hatching.",
          "Embodying the dense lines and rhythmic pattern of Hatching.",
          "linear rhythm and texture of Hatching.",
          "Rendering with the parallel lines and depth of Hatching.",
          "line-based shading of Hatching.",
          "rhythmic lines and texture of Hatching.",
          "The dense linear work and depth characteristic of Hatching.",
          "Using the rhythmic lines and texture technique of Hatching.",
          "Infusing the sketchy texture and linear rhythm of Hatching.",
        ]
      },
      {
        title: "Cross-Hatching",
        thumbnail: "techniques/cross-hatching.png",
        prompts: [
          "Employing the intersecting lines technique of Cross-Hatching.",
          "Infusing the rich texture achieved by Cross-Hatching.",
          "layered strokes style of Cross-Hatching.",
          "Rendering with the dramatic depth of Cross-Hatching.",
          "Conveying depth and shadows through Cross-Hatching.",
          "Applying the intersection of lines technique of Cross-Hatching.",
          "Illustrating using the contrasting lines style of Cross-Hatching.",
          "With the dramatic shading achieved through Cross-Hatching.",
          "Drawing inspiration from the intersecting strokes technique of Cross-Hatching.",
          "Emulating the depth created by Cross-Hatching.",
          "Using the intricate design of layered strokes in Cross-Hatching.",
          "contrast and shadows of Cross-Hatching.",
          "Conveying the depth and shadow using Cross-Hatching.",
          "dramatic, intersecting lines of Cross-Hatching.",
          "Creating depth and shadows using the Cross-Hatching technique.",
          "Harnessing the contrast and texture created by Cross-Hatching.",
          "Drawing with the depth and shadow techniques of Cross-Hatching.",
          "detailed lines and texture of Cross-Hatching.",
          "contrasting lines technique of Cross-Hatching.",
          "Infusing the texture and depth of Cross-Hatching.",
        ]
      },
      {
        title: "Stippling",
        thumbnail: "techniques/stippling.jpg",
        prompts: [
          "Using the pointillist technique of Stippling.",
          "dotted texture and gradations of Stippling.",
          "texture and tone created by Stippling.",
          "Rendering with the delicate dot work of Stippling.",
          "Harnessing the texture created by Stippling.",
          "With the pointillist and texture of Stippling.",
          "Drawing inspiration from the dot work and texture of Stippling.",
          "texture and dot work technique of Stippling.",
          "Using the tonal gradation technique of Stippling.",
          "texture and delicate dots of Stippling.",
          "Using the pointillist technique of Stippling for detailed texture.",
          "dot work technique of Stippling for tonal gradation.",
          "Drawing inspiration from the tonal gradation and texture of Stippling.",
          "texture and dot work of Stippling.",
          "Using the dot work technique of Stippling for tonal depth.",
          "tonal gradation and texture of Stippling.",
          "pointillist technique of Stippling for tonal depth.",
          "Drawing inspiration from the tonal depth and texture of Stippling.",
          "tonal depth and dot work of Stippling.",
          "Using the dot work technique of Stippling for tonal contrast.",
        ]
      },
      {
        title: "Underpainting",
        thumbnail: "techniques/underpainting.png",
        prompts: [
          "With the foundational color layering of Underpainting.",
          "Drawing inspiration from the tonal groundwork of Underpainting.",
          "initial color layering technique of Underpainting.",
          "Embodying the depth provided by Underpainting.",
          "foundational color and tone work of Underpainting.",
          "Using the foundational color layer of Underpainting.",
          "Drawing inspiration from the color layering technique of Underpainting.",
          "color layering technique of Underpainting.",
          "Using the color layering and tone work technique of Underpainting.",
          "depth and color layer of Underpainting.",
          "tonal groundwork and color layer of Underpainting.",
          "Using the color layer and tonal groundwork technique of Underpainting.",
          "Drawing inspiration from the tonal groundwork and color layering of Underpainting.",
          "color layering technique and tonal groundwork of Underpainting.",
          "Using the foundational color layer and tone work technique of Underpainting.",
          "color layer and foundational color layer of Underpainting.",
          "color layer and tonal groundwork of Underpainting.",
          "Using the color layer and tonal groundwork technique of Underpainting.",
          "Drawing inspiration from the foundational color layer and tonal groundwork of Underpainting.",
          "color layering and tonal groundwork technique of Underpainting.",
        ]
      },
      {
        title: "Scumbling",
        thumbnail: "techniques/scumbling.png",
        prompts: [

          "Scumbling technique for creating a soft glow.",
          "Rendering with the semi-transparent layers of Scumbling.",
          "Employing the technique of Scumbling for subtle color transitions.",
          "Applying the Scumbling technique for a dreamy atmosphere.",
          "soft, ethereal effects achieved by Scumbling.",
          "Scumbling technique for subtle color blending.",
          "Creating an ethereal atmosphere using the Scumbling technique.",
          "Conveying a soft, luminous effect through Scumbling.",
          "With the dreamy color blending achieved by Scumbling.",
          "Illustrating using the semi-transparent layering technique of Scumbling.",
          "Scumbling technique for a dreamy, glowing effect.",
          "soft color transitions created by Scumbling.",
          "Creating luminosity and depth using Scumbling.",
          "Harnessing the Scumbling technique for its soft color blending.",
          "With the dreamy, soft glow effect of Scumbling.",
          "Illustrating using the Scumbling technique for its soft transitions.",
          "Conveying a dreamy, ethereal atmosphere with Scumbling.",
          "luminous, soft glow achieved by Scumbling.",
          "Harnessing the semi-transparent layering of Scumbling for a dreamy atmosphere.",
          "Scumbling technique for creating luminous, soft colors.",

        ]
      },
      {
        title: "Trompe-l'oeil",
        thumbnail: "techniques/tromp-l-oeil.png",
        prompts: [

          "Employing the illusionistic technique of Trompe-l'oeil.",
          "hyper-realistic, illusionary style of Trompe-l'oeil.",
          "Rendering with the optical illusion-based technique of Trompe-l'oeil.",
          "Utilizing Trompe-l'oeil to create deceptive spatial illusions.",
          "Conveying a three-dimensional effect using Trompe-l'oeil.",
          "With the meticulously detailed illusions of Trompe-l'oeil.",
          "Using Trompe-l'oeil to create a visually deceptive scene.",
          "Illustrating using the intricate illusionary technique of Trompe-l'oeil.",
          "Utilizing Trompe-l'oeil to trick the eye into seeing depth.",
          "realistic spatial illusions of Trompe-l'oeil.",
          "With the visually deceptive technique of Trompe-l'oeil.",
          "Using Trompe-l'oeil to create a sense of three-dimensionality.",
          "Illustrating using Trompe-l'oeil to trick the viewer's eye.",
          "Conveying realistic depth and detail using Trompe-l'oeil.",
          "deceptive spatial effects of Trompe-l'oeil.",
          "Harnessing Trompe-l'oeil to create an optical illusion of depth.",
          "With the realistic depth illusion created by Trompe-l'oeil.",
          "Using Trompe-l'oeil to create a sense of three-dimensional realism.",
          "Illustrating using Trompe-l'oeil to create a sense of real-world depth.",
          "Harnessing the power of Trompe-l'oeil to create a visually deceptive scene.",

        ]
      },
      {
        title: "Collage",
        thumbnail: "techniques/collage.jpg",
        prompts: [

          "Constructed with the varied textures and layering technique of Collage.",
          "Rendering with the creative cut-and-paste method of Collage.",
          "Exploring the fragmented, layered approach of Collage.",
          "Inspired by the diverse textures and eclectic nature of Collage.",
          "Using the multifaceted layering technique of Collage.",
          "whimsical, fragmented aesthetic of Collage.",
          "textured, layered appeal of Collage.",
          "cut-and-paste method of Collage for an eclectic aesthetic.",
          "Constructing with the whimsical, layered technique of Collage.",
          "Inspired by the varied textures and aesthetics found in Collage.",
          "cut-and-paste technique found in Collage.",
          "Creating using the layered and textured method of Collage.",
          "varied textures and layering techniques in Collage.",
          "eclectic, whimsical aesthetics of Collage.",
          "Creating with the fragmented and varied textures of Collage.",
          "Employing the cut-and-paste method and layered technique of Collage.",
          "whimsical, textured nature of Collage.",
          "fragmented aesthetic and varied textures of Collage.",
          "eclectic aesthetics and layered technique of Collage.",
          "Constructed with the creative, layered technique of Collage.",

        ]
      },
      {
        title: "Decoupage",
        thumbnail: "techniques/decoupage.jpg",
        prompts: [
          "Inspired by the intricate layering and varnish technique of Decoupage.",
          "Decoupage technique for a smooth, polished finish.",
          "glossy finish and layered aesthetic of Decoupage.",
          "cut-and-paste method and polished finish of Decoupage.",
          "layered, lacquered aesthetics of Decoupage.",
          "smooth finish and layering technique of Decoupage.",
          "Constructed with the intricate layering and varnish technique of Decoupage.",
          "polished finish and detailed layering of Decoupage.",
          "Using the intricate cut-and-paste method and lacquered finish of Decoupage.",
          "Creating with the layered aesthetics and glossy finish of Decoupage.",
          "Using the Decoupage technique for a smooth, polished look.",
          "layered, lacquered aesthetics of Decoupage.",
          "glossy finish and detailed layering of Decoupage.",
          "Constructed with the intricate cut-and-paste method of Decoupage.",
          "layered aesthetics and polished finish of Decoupage.",
          "Using the Decoupage technique for a detailed, layered aesthetic.",
          "Creating with the glossy finish and detailed layering technique of Decoupage.",
          "intricate cut-and-paste method and polished finish of Decoupage.",
          "layered, lacquered aesthetics of Decoupage.",
          "Constructed with the detailed layering and polished finish of Decoupage.",

        ]
      },
      {
        title: "Batik",
        description: "Batik is an Indonesian technique of wax-resist dyeing applied to the whole cloth.",
        thumbnail: "techniques/batik.png",
        prompts: [

          "resist-dyeing technique and intricate designs of Batik.",
          "Batik method for a vibrant, patterned aesthetic.",
          "resist-dyeing technique and detailed patterns of Batik.",
          "vibrant colors and intricate designs of Batik.",
          "Using the Batik technique for a bold, patterned aesthetic.",
          "Constructed with the resist-dyeing method and intricate designs of Batik.",
          "vibrant colors and patterned aesthetic of Batik.",
          "Using the Batik method for detailed, vibrant patterns.",
          "resist-dyeing technique and vibrant colors of Batik.",
          "detailed patterns and vibrant colors of Batik.",
          "Batik method for a bold, patterned aesthetic.",
          "Constructed with the vibrant colors and intricate patterns of Batik.",
          "Batik technique for a vibrant, patterned look.",
          "resist-dyeing method and vibrant colors of Batik.",
          "Using the detailed patterns and bold colors of Batik.",
          "Constructed with the Batik technique for a vibrant, patterned aesthetic.",
          "resist-dyeing method and detailed patterns of Batik.",
          "vibrant colors and intricate designs of Batik.",
          "Using the Batik method for bold, vibrant patterns.",
          "resist-dyeing technique and intricate designs of Batik.",

        ]
      },
      {
        title: "Marbling",
        description: "Paper marbling is a method of aqueous surface design, which can produce patterns similar to smooth marble or other kinds of stone.",
        thumbnail: "techniques/marbling.jpg",
        prompts: [

          "fluid, swirling patterns of Marbling.",
          "Marbling technique for a vibrant, liquid-like aesthetic.",
          "Constructed with the fluid patterns and vibrant colors of Marbling.",
          "Marbling method for swirling, vibrant patterns.",
          "fluid, swirling patterns of Marbling.",
          "Marbling technique for a liquid-like, vibrant aesthetic.",
          "swirling patterns and vibrant colors of Marbling.",
          "Using the Marbling method for fluid, vibrant patterns.",
          "Constructed with the liquid-like aesthetic and vibrant colors of Marbling.",
          "fluid, swirling patterns of Marbling.",
          "Marbling technique for a vibrant, liquid-like look.",
          "swirling patterns and vibrant colors of Marbling.",
          "Using the Marbling method for fluid, vibrant designs.",
          "Constructed with the liquid-like aesthetic and vibrant colors of Marbling.",
          "swirling patterns and vibrant colors of Marbling.",
          "Marbling technique for a fluid, vibrant aesthetic.",
          "swirling patterns and vibrant colors of Marbling.",
          "Using the Marbling method for fluid, vibrant designs.",
          "Constructed with the liquid-like aesthetic and vibrant colors of Marbling.",
          "fluid, swirling patterns of Marbling.",

        ]
      },
      {
        title: "Quilling",
        description: "Quilling is an art form that involves the use of strips of paper that are rolled, shaped, and glued together to create decorative designs. The paper is rolled, looped, curled, twisted, and otherwise manipulated to create shapes that make up designs",
        thumbnail: "techniques/quilling.jpg",
        prompts: [

          "intricate, rolled paper technique of Quilling.",
          "Using the Quilling method for a textured, 3D aesthetic.",
          "Constructed with the rolled paper technique and 3D textures of Quilling.",
          "Quilling technique for an intricate, textured look.",
          "rolled paper method and 3D aesthetic of Quilling.",
          "Quilling technique for a textured, 3D aesthetic.",
          "Using the rolled paper method and textured look of Quilling.",
          "Constructed with the intricate, 3D technique of Quilling.",
          "Quilling method for a textured, 3D look.",
          "rolled paper technique and textured aesthetic of Quilling.",
          "Quilling technique for an intricate, 3D aesthetic.",
          "Using the rolled paper method and 3D look of Quilling.",
          "Constructed with the intricate, textured technique of Quilling.",
          "Quilling method for a 3D, textured aesthetic.",
          "rolled paper technique and 3D look of Quilling.",
          "Quilling technique for an intricate, 3D look.",
          "Using the rolled paper method and 3D aesthetic of Quilling.",
          "Constructed with the intricate, textured technique of Quilling.",
          "Quilling method for a 3D, textured look.",
          "rolled paper technique and textured aesthetic of Quilling.",

        ]
      },
      {
        title: "Gilding",
        description: "Gilding is a decorative technique for applying a very thin coating of gold over solid surfaces.",
        thumbnail: "techniques/gilding.jpg",
        prompts: [

          "radiant and luxurious technique of Gilding.",
          "Gilding technique for a lavish, metallic sheen.",
          "Constructed with the Gilding method for a golden, lustrous look.",
          "rich and opulent process of Gilding.",
          "Gilding technique for a royal, shiny aesthetic.",
          "grandeur of Gilding for a golden, lustrous finish.",
          "metallic sheen and opulence of Gilding.",
          "Using the golden and luxurious method of Gilding.",
          "lustrous technique of Gilding for a lavish look.",
          "radiant and golden process of Gilding.",
          "Gilding method for a shiny, metallic finish.",
          "regal and golden technique of Gilding.",
          "Constructed with the Gilding technique for a opulent, radiant look.",
          "lavish and golden process of Gilding.",
          "Gilding method for a lustrous, shiny aesthetic.",
          "opulence of Gilding for a golden, radiant finish.",
          "metallic sheen and lavish technique of Gilding.",
          "Using the golden and shiny method of Gilding.",
          "lustrous technique of Gilding for a rich look.",
          "radiant and metallic process of Gilding.",

        ]
      },
      {
        title: "Sgraffito",
        description: "Sgraffito is a technique produced by applying two successive layers of contrasting glaze, and then scratching so as to reveal parts of the underlying layer.",
        thumbnail: "techniques/sgraffito.jpg",
        prompts: [
          "Sgraffito technique for a textured, layered look.",
          "contrast and depth of the Sgraffito method.",
          "Constructed with the Sgraffito technique for a detailed, etched aesthetic.",
          "layered and textured technique of Sgraffito.",
          "depth and contrast of the Sgraffito method.",
          "Sgraffito technique for a scratched, layered aesthetic.",
          "textured and etched look of Sgraffito.",
          "Sgraffito method for a detailed, textured look.",
          "depth and contrast of the Sgraffito technique.",
          "etched and textured technique of Sgraffito.",
          "Sgraffito method for a detailed, etched look.",
          "layered and scratched technique of Sgraffito.",
          "Constructed with the Sgraffito technique for a contrasted, detailed aesthetic.",
          "depth and contrast of the Sgraffito method.",
          "etched and textured technique of Sgraffito.",
          "Sgraffito technique for a scratched, detailed look.",
          "textured and etched look of Sgraffito.",
          "Sgraffito method for a detailed, textured aesthetic.",
          "depth and contrast of the Sgraffito technique.",
          "etched and textured technique of Sgraffito.",

        ]
      },
      {
        title: "Intaglio",
        description: "Intaglio is the family of printing and printmaking techniques in which the image is incised into a surface and the incised line or sunken area holds the ink.",
        thumbnail: "techniques/intaglio.jpg",
        prompts: [
          "detailed and intricate technique of Intaglio.",
          "depth and texture of the Intaglio method.",
          "intricate technique of Intaglio for a deeply etched look.",
          "detail and depth of the Intaglio process.",
          "Intaglio technique for a textured, deeply carved aesthetic.",
          "Intaglio method for a detailed, deeply incised look.",
          "intricate and deep carving technique of Intaglio.",
          "Constructed with the Intaglio technique for a textured, etched look.",
          "detail and depth of the Intaglio process.",
          "Intaglio technique for a deeply carved, textured aesthetic.",
          "Intaglio method for a detailed, deeply incised look.",
          "intricate and deep carving technique of Intaglio.",
          "Constructed with the Intaglio technique for a textured, etched aesthetic.",
          "detail and depth of the Intaglio process.",
          "Intaglio technique for a deeply carved, textured look.",
          "Intaglio method for a detailed, deeply incised aesthetic.",
          "intricate and deep carving technique of Intaglio.",
          "Intaglio technique for a textured, etched look.",
          "detail and depth of the Intaglio process.",
          "Intaglio technique for a deeply carved, textured aesthetic.",

        ]
      },
      {
        title: "Lithography",
        description: "Lithography is a planographic method of printing from a stone (lithographic limestone) or a metal plate with a smooth surface.",
        thumbnail: "techniques/lithography.jpg",
        prompts: [

          "Lithography technique for a smooth, tonal look.",
          "Lithography method for a detailed, inked aesthetic.",
          "Constructed with the Lithography technique for a smooth, printed look.",
          "detail and tone of the Lithography process.",
          "Lithography technique for a flat, printed aesthetic.",
          "Lithography method for a detailed, inked look.",
          "smooth and flat technique of Lithography.",
          "Lithography method for a detailed, printed look.",
          "detail and tone of the Lithography process.",
          "Lithography technique for a flat, printed aesthetic.",
          "Lithography method for a detailed, inked look.",
          "smooth and flat technique of Lithography.",
          "Constructed with the Lithography technique for a smooth, printed look.",
          "detail and tone of the Lithography process.",
          "Lithography technique for a flat, printed aesthetic.",
          "Lithography method for a detailed, inked look.",
          "smooth and flat technique of Lithography.",
          "Lithography method for a detailed, printed look.",
          "detail and tone of the Lithography process.",
          "Lithography technique for a flat, printed aesthetic.",

        ]
      },
      {
        title: "Silkscreen Printing",
        description: "Screen printing is a printing technique where a mesh is used to transfer ink or dye onto a substrate, except in areas made impermeable to the ink by a blocking stencil.",
        thumbnail: "techniques/silk-screen-printing.jpg",
        prompts: [
          "bold, crisp lines and layered colors characteristic of Silkscreen Printing.",
          "repetition and pattern typical of Silkscreen Printing.",
          "tactile and textural nature of Silkscreen Printing.",
          "vibrant, flat color fields inherent to Silkscreen Printing.",
          "precision and clarity unique to Silkscreen Printing.",
          "featuring the multi-layered color application of Silkscreen Printing.",
          "employing the sharp contrasts and pop-art feel associated with Silkscreen Printing.",
          "with a nod to the industrial, graphic sensibilities of Silkscreen Printing.",
          "taking inspiration from the mass-produced aesthetic integral to Silkscreen Printing.",
          "smooth, uniform finishes typical of Silkscreen Printing.",
          "embodying the stencil-based, repetitive design associated with Silkscreen Printing.",
          "utilizing the bold graphic lines and high contrast of Silkscreen Printing.",
          "reveling in the vibrant hues and defined forms of Silkscreen Printing.",
          "mechanical precision and bright, saturated colors of Silkscreen Printing.",
          "with an emphasis on the flat areas of color characteristic of Silkscreen Printing.",
          "printmaker's deliberate layering technique inherent to Silkscreen Printing.",
          "pop art aesthetic and stark contrasts found in Silkscreen Printing.",
          "simplicity and boldness of design in Silkscreen Printing.",
          "stark, graphic quality associated with Silkscreen Printing.",
          "clean lines and bright, uniform colors of Silkscreen Printing.",

        ]
      },
      {
        title: "Linocut",
        description: "Linocut is a printmaking technique, a variant of woodcut in which a sheet of linoleum (sometimes mounted on a wooden block) is used for a relief surface.",
        thumbnail: "techniques/linocut.jpg",
        prompts: [
          "bold, graphic designs characteristic of Linocut.",
          "sharp contrasts and expressive lines inherent to Linocut.",
          "carved texture and stark simplicity unique to Linocut.",
          "relief prints and heavy lines found in Linocut.",
          "woodcut-like aesthetic and carved surfaces of Linocut.",
          "with a nod to the chiseled textures and solid forms of Linocut.",
          "expressive carving and strong tonal contrasts of Linocut.",
          "employing the rough-hewn, tactile quality associated with Linocut.",
          "utilizing the black-and-white contrast and bold outlines of Linocut.",
          "featuring the strong, simplified forms and deep cuts of Linocut.",
          "embodying the hand-carved aesthetic and relief design intrinsic to Linocut.",
          "reveling in the crisp edges and dramatic light-and-dark contrast of Linocut.",
          "block printing technique and tactile surfaces of Linocut.",
          "raw, hand-carved lines and stark contrasts of Linocut.",
          "hand-pressed process and simplified, graphic aesthetic of Linocut.",
          "expressive lines and depth of texture in Linocut.",
          "craft-like, hands-on process characteristic of Linocut.",
          "bold design and high contrast found in Linocut.",
          "distinctive, carved textures and bold forms of Linocut.",
          "relief printing technique and stark, graphic design of Linocut.",

        ]
      },
      {
        title: "Cyanotype",
        description: "The cyanotype is a slow-reacting, economical photographic printing formulation sensitive to a limited near ultraviolet and blue light spectrum. It produces a cyan-blue print used for art as monochrome imagery.",
        thumbnail: "techniques/cyanotype.jpg",
        prompts: [

          "embodying the deep blues and high contrast of Cyanotype.",
          "sun-printed images and rich tonal values of Cyanotype.",
          "photogram technique and stark, white silhouettes unique to Cyanotype.",
          "blueprint-like design and monochromatic blue palette of Cyanotype.",
          "historic photographic process and prussian blue hues of Cyanotype.",
          "utilizing the sun-sensitive paper technique and bright white highlights of Cyanotype.",
          "revealing the sunlit impressions and photogenic drawings characteristic of Cyanotype.",
          "intense blue coloration and negative space inherent to Cyanotype.",
          "incorporating the white silhouettes and blue background typical to Cyanotype.",
          "photogram imagery and tonal range of Cyanotype.",
          "detailed shadow work and strong contrasts of Cyanotype.",
          "embodying the sunlight-exposed aesthetic and rich, blue tonality of Cyanotype.",
          "with a nod to the photogenic drawings and sunlit impressions found in Cyanotype.",
          "contact-printing process and Prussian Blue results of Cyanotype.",
          "photogram technique and delicate balance between light and dark in Cyanotype.",
          "blueprint-like aesthetic and intense blue and white contrast of Cyanotype.",
          "fine detail and blue tonal range inherent to Cyanotype.",
          "sunlight-induced images and high contrast of Cyanotype.",
          "sun-printed method and distinctive blue coloration of Cyanotype.",
          "utilizing the sun-sensitive process and stark, graphic contrast of Cyanotype.",

        ]
      },
      {
        title: "Papier-mâché",
        description: "Papier-mâché (literally \"chewed paper\") is a composite material consisting of paper pieces or pulp, sometimes reinforced with textiles, bound with an adhesive, such as glue, starch, or wallpaper paste.",
        thumbnail: "techniques/papier-mache.jpg",
        prompts: [

          "tactile, sculpted surfaces and multi-dimensional aspects of Papier-mâché.",
          "lightweight, mouldable nature inherent to Papier-mâché.",
          "layered, textured aesthetic and whimsical design of Papier-mâché.",
          "organic forms and moldable structures unique to Papier-mâché.",
          "layered construction and sculptural qualities of Papier-mâché.",
          "lightness and flexibility of Papier-mâché.",
          "employing the soft, rounded forms and hand-molded characteristics of Papier-mâché.",
          "utilizing the malleable, hand-crafted aesthetic of Papier-mâché.",
          "embodying the layer upon layer construction and three-dimensional aspect of Papier-mâché.",
          "relief-like structure and handmade feel of Papier-mâché.",
          "featuring the recycled material use and light, airy structure typical to Papier-mâché.",
          "tactile texture and organic, imperfect forms of Papier-mâché.",
          "strength despite lightness and ability to mold complex shapes characteristic of Papier-mâché.",
          "handmade, craft-like process inherent to Papier-mâché.",
          "layered texture and three-dimensional form unique to Papier-mâché.",
          "malleable, customizable nature of Papier-mâché.",
          "utilizing the diverse application and robust, lightweight quality of Papier-mâché.",
          "with a nod to the eco-friendly, recyclable material usage of Papier-mâché.",
          "featuring the 3D shaping capability and textured surface of Papier-mâché.",
          "embodying the flexibility, layered construction, and organic forms of Papier-mâché.",

        ]
      },
      {
        title: "Origami",
        description: "Origami is the Japanese art of paper folding.",
        thumbnail: "techniques/origami.jpg",
        prompts: [

          "delicate folds and intricate patterns of Origami.",
          "featuring the geometrical precision and three-dimensional forms inherent to Origami.",
          "paper folding artistry and minimalist aesthetics unique to Origami.",
          "emphasizing the detailed creases and precision of Origami.",
          "symmetrical designs and paper manipulation characteristic of Origami.",
          "embodying the simplicity, elegance, and complexity associated with Origami.",
          "replicating the abstract figures and structural form of Origami.",
          "highlighting the careful folds and sharp edges that define Origami.",
          "reflecting the transformation of a flat surface into a complex three-dimensional shape as in Origami.",
          "utilising the clean lines and geometric precision typical of Origami.",
          "inspired by the delicacy, precision and harmony of Origami.",
          "underscoring the intricate patterns and exacting precision found in Origami.",
          "featuring the illusion of complexity from simplicity that Origami represents.",
          "incorporating the thematic symbolism and paper transformation of Origami.",
          "with a nod to the meticulous folds and elegant forms in Origami.",
          "echoing the angular geometry and defined creases characteristic of Origami.",
          "emphasizing the paper folding technique and the creation of lifelike forms as in Origami.",
          "replicating the step-by-step construction and transformative design of Origami.",
          "geometric patterns and fluid transformation associated with Origami.",
          "highlighting the intricate folds and minimalist aesthetics unique to Origami.",
        ]
      },
      {
        title: "Plein Air",
        thumbnail: "techniques/plein-air.jpg",
        prompts: [

          "channeling the immediacy and vibrant colors of Plein Air.",
          "reflecting the outdoor lighting and atmospheric effects inherent to Plein Air.",
          "direct observation and atmospheric conditions unique to Plein Air.",
          "impressionistic brushwork and natural light of Plein Air.",
          "with the changing light and weather conditions characteristic of Plein Air.",
          "highlighting the sensory immersion and naturalistic scenes associated with Plein Air.",
          "embodying the spontaneous brushwork and quickly captured impressions of Plein Air.",
          "emphasizing the landscape immersion and color harmony of Plein Air.",
          "echoing the fresh colors and direct observation methodology typical of Plein Air.",
          "utilizing the spontaneous approach and natural illumination found in Plein Air.",
          "featuring the energetic brushstrokes and vibrant colors of Plein Air.",
          "taking inspiration from the open-air scenery and fleeting moments captured in Plein Air.",
          "sunlight's effects and natural color palette inherent to Plein Air.",
          "reflecting the outdoor setting and transient light conditions of Plein Air.",
          "replicating the natural light and atmospheric ambiance associated with Plein Air.",
          "focusing on the rapid sketch-like approach and vibrant color juxtapositions of Plein Air.",
          "highlighting the on-site inspiration and transient atmosphere of Plein Air.",
          "with a nod to the quick brushwork and color observations of Plein Air.",
          "airy, luminous qualities and impromptu approach of Plein Air.",
          "reflecting the realistic lighting and color fidelity of Plein Air.",
        ]
      },
      {
        title: "Perspective Drawing",
        thumbnail: "techniques/perspective-drawing.jpg",
        prompts: [

          "featuring the depth and scale adjustments of Perspective Drawing.",
          "emphasizing the vanishing points and three-dimensional illusion in Perspective Drawing.",
          "linear perspective and spatial illusion inherent to Perspective Drawing.",
          "highlighting the depth perception and dimensionality unique to Perspective Drawing.",
          "realistic proportions and spatial relationships in Perspective Drawing.",
          "incorporating the foreshortening and converging lines of Perspective Drawing.",
          "replicating the illusion of depth and scale typical of Perspective Drawing.",
          "utilizing the vanishing points and spatial depth found in Perspective Drawing.",
          "embodying the sense of distance and three-dimensionality characteristic of Perspective Drawing.",
          "drawing on the geometric rules and spatial accuracy inherent in Perspective Drawing.",
          "using the depth cues and diminishing scale associated with Perspective Drawing.",
          "reflecting the geometric principles and depth illusion unique to Perspective Drawing.",
          "highlighting the linear convergence and scaled objects of Perspective Drawing.",
          "depth illusion and spatial relationships in Perspective Drawing.",
          "underscoring the diminishing size and convergence at a distance characteristic of Perspective Drawing.",
          "reflecting the proportional accuracy and visual depth illusion of Perspective Drawing.",
          "echoing the spatial relationships and three-dimensional illusion of Perspective Drawing.",
          "relative size and overlap of objects as seen in Perspective Drawing.",
          "representing the visual depth and scale adjustment inherent in Perspective Drawing.",
          "utilizing the illusion of depth and spatial relationships found in Perspective Drawing.",
        ]
      },
      {
        title: "Monotyping",
        description: "Monotyping is a type of printmaking made by drawing or painting on a smooth, non-absorbent surface. The surface, or matrix, was historically a copper etching plate, but in contemporary work it can vary from zinc or glass to acrylic glass.",
        thumbnail: "techniques/monotyping.jpg",
        prompts: [

          "Monotyping-style, unique impressions with rich, soft textures, characteristic of Monotyping.",
          "Monotyping-style, the use of a smooth, non-absorbent surface as a printing plate, style of Monotyping.",
          "Monotyping-style, transfer of ink from a flat surface onto paper, creating a single impression, inherent to Monotyping.",
          "Monotyping-style, painterly qualities and printmaking aspects combined, a hallmark of Monotyping.",
          "Monotyping-style, creating a unique print by manipulating ink or paint on a smooth surface, central to Monotyping.",
          "Monotyping-style, the technique of creating a single impression from a smooth surface, distinctive of Monotyping.",
          "Monotyping-style, the combination of painting and printmaking, common in Monotyping.",
          "Monotyping-style, the production of unique prints using a smooth, non-absorbent surface as a plate, found in Monotyping.",
          "Monotyping-style, the use of oil paint or printing ink on a smooth surface to create a single print, echoing Monotyping.",
          "Monotyping-style, unique, unreproducible prints with soft, painterly textures, typical of Monotyping.",
          "Monotyping-style, producing a single, unique print by transferring a design created on a smooth surface, in line with Monotyping.",
          "Monotyping-style, the creation of a unique print by pressing paper onto a painted or inked surface, common in Monotyping.",
          "Monotyping-style, an unreproducible print created by pressing paper against a painted or inked surface, typical in Monotyping.",
          "Monotyping-style, one-off prints that combine painting and printmaking techniques, distinctive of Monotyping.",
          "Monotyping-style, the creation of a single print by transferring ink or paint from a smooth surface, a defining trait of Monotyping.",
          "Monotyping-style, single-impression prints with the softness of paintings, inherent in Monotyping.",
          "Monotyping-style, the process of creating a unique impression by painting on a smooth, non-absorbent surface, common in Monotyping.",
          "Monotyping-style, a unique print produced by transferring a design from a smooth surface, indicative of Monotyping.",
          "Monotyping-style, the creation of a single print with a rich, painterly texture, typical of Monotyping.",
          "Monotyping-style, producing unique, unreproducible prints by manipulating ink or paint on a smooth surface, inherent in Monotyping.",

        ]
      },
      {
        title: "Relief Sculpture",
        thumbnail: "techniques/relief-sculpture.jpg",
        prompts: [

          "figures carved into a flat surface that stand out from the background, typical of Relief Sculpture.",
          "a form that projects from its background, characteristic of Relief Sculpture.",
          "a sculptural technique where the sculpted elements remain attached to a solid background, central to Relief Sculpture.",
          "sculptural forms that project from a flat surface, style of Relief Sculpture.",
          "the art of carving figures into a flat surface, so they stand out from the background, common in Relief Sculpture.",
          "the process of carving into a flat surface, creating figures that project from the background, distinctive of Relief Sculpture.",
          "the technique of creating sculptures by carving or molding a flat surface, in line with Relief Sculpture.",
          "projecting figures carved or modeled on a flat surface, indicative of Relief Sculpture.",
          "creating a 3D effect by carving or modeling designs on a flat surface, typical in Relief Sculpture.",
          "figures projecting from a background to give a three-dimensional effect, defining traits of Relief Sculpture.",
          "figures that stand out from the background due to being carved into a flat surface, common in Relief Sculpture.",
          "the art of creating a three-dimensional effect by sculpting figures into a flat surface, style of Relief Sculpture.",
          "figures standing out from a flat background due to being sculpted into it, echoing Relief Sculpture.",
          "carving figures into a flat surface, so they project out, reminiscent of Relief Sculpture.",
          "figures that are carved to project from a flat background, typical of Relief Sculpture.",
          "the creation of sculptural elements that remain attached to a solid background, in line with Relief Sculpture.",
          "sculpting figures into a flat surface to stand out from the background, indicative of Relief Sculpture.",
          "creating a three-dimensional impression by carving figures into a flat surface, central to Relief Sculpture.",
          "figures sculpted into a flat surface that project outwards, inherent in Relief Sculpture.",
          "a sculptural technique where figures are carved into a flat surface to project from the background, echoing Relief Sculpture.",

        ]
      },
      {
        title: "Lost-Wax Casting",
        thumbnail: 'techniques/lost-wax-casting.png',
        prompts: [

          "style of Lost-Wax-Casting.",
          "style of metal casting, Lost-Wax Casting.",
          "style of metal sculptures, Lost-Wax Casting.",
          "style of metal artworks from an original wax model, using the Lost-Wax Casting technique.",

        ]
      },
      {
        title: "Ceramic Glazing",
        thumbnail: "techniques/ceramic-glazing.jpg",
        prompts: [

          "applying a vitreous coating to ceramics for decoration and waterproofing, characteristic of Ceramic Glazing.",
          "using glossy, matte, or satin finishes, typical of Ceramic Glazing.",
          "introducing color, texture, and brightness through the use of glazes on ceramics.",
          "creating functional and decorative pieces with a smooth, glassy coating, inherent to Ceramic Glazing.",
          "achieving unique color effects and surface finishes on ceramics through glazing.",
          "using various glazing techniques to create diverse effects on ceramics.",
          "layering different glazes to produce intricate surface designs on ceramics.",
          "applying glaze to ceramics to enhance their beauty and durability.",
          "creating striking visual effects on ceramics through the application of glazes.",
          "exploring color, texture, and brightness in ceramics through the application of glazes.",
          "using glazes to create a wide range of colors, textures, and finishes on ceramics.",
          "enhancing the appearance and functionality of ceramics with glaze.",
          "applying vitreous coatings to ceramics to create decorative and functional pieces.",
          "utilizing glaze to add depth, color, and texture to ceramics.",
          "achieving a glass-like finish on ceramics through the application of glazes.",
          "creating a durable and decorative surface on ceramics using glaze.",
          "manipulating the color and texture of ceramics with different glazes.",
          "achieving a variety of finishes on ceramics through the application of glazes.",
          "using glaze to create a wide range of effects and finishes on ceramics.",
          "enhancing ceramics with glazes for a shiny, matte, or satin finish.",

        ]
      },
      {
        title: "Paper Cutting",
        thumbnail: "techniques/paper-cutting.png",
        prompts: [

          "paper-cutting-style, creating intricate designs by cutting paper style of Paper Cutting.",
          "paper-cutting-style, using scissors or a knife to create detailed images and patterns on paper.",
          "paper-cutting-style, the use of precision and patience to create detailed designs from paper.",
          "paper-cutting-style, creating beautiful artwork by cutting paper into elaborate designs.",
          "paper-cutting-style, transforming a simple sheet of paper into a work of art through detailed cutting.",
          "paper-cutting-style, producing intricate patterns and designs by cutting paper.",
          "paper-cutting-style, the use of sharp tools to cut intricate designs into paper.",
          "paper-cutting-style, creating delicate designs through precise cutting of paper.",
          "paper-cutting-style, the technique of creating art by cutting designs out of paper.",
          "paper-cutting-style, using precision cutting to transform paper into a delicate work of art.",
          "paper-cutting-style, turning paper into delicate designs through precise cutting techniques.",
          "paper-cutting-style, creating art from paper through the meticulous process of cutting.",
          "paper-cutting-style, producing complex designs through precise cuts in paper.",
          "paper-cutting-style, the use of paper, transformed into artwork through precise cutting.",
          "paper-cutting-style, creating intricate images and patterns on paper using scissors or a knife.",
          "paper-cutting-style, transforming a flat sheet of paper into a complex design through cutting.",
          "paper-cutting-style, creating artwork through the precision cutting of paper.",
          "paper-cutting-style, creating intricate designs and patterns through the art of paper cutting.",
          "paper-cutting-style, the skillful transformation of paper into intricate designs through cutting.",
          "paper-cutting-style, creating delicate works of art through precise cutting of paper.",

        ]
      },
      {
        title: "Stenciling",
        thumbnail: "techniques/stenciling.png",
        prompts: [

          "Stenciling-style, the use of a template to create a design by applying pigment through the cut-out shapes.",
          "Stenciling-style, creating repetitive patterns or designs using a cut-out template.",
          "Stenciling-style, the technique of applying pigment over a template to create a design.",
          "Stenciling-style, the use of a stencil to create sharp, repeatable designs.",
          "Stenciling-style, creating designs by applying pigment over a cut-out template.",
          "Stenciling-style, the process of transferring designs onto a surface using a stencil.",
          "Stenciling-style, applying pigment over a stencil to create crisp, repeatable designs.",
          "Stenciling-style, using a stencil to transfer a design onto a surface.",
          "Stenciling-style, creating patterns or designs by applying pigment through a stencil.",
          "Stenciling-style, the art of producing crisp designs using a stencil.",
          "Stenciling-style, using a cut-out template to create patterns or designs.",
          "Stenciling-style, the technique of creating designs by applying pigment through a stencil.",
          "Stenciling-style, creating repetitive patterns using a cut-out template and pigment.",
          "Stenciling-style, the use of a stencil to create crisp, repeatable patterns or designs.",
          "Stenciling-style, using a stencil to apply pigment and create a design.",
          "Stenciling-style, transferring a design onto a surface using a cut-out template.",
          "Stenciling-style, the technique of using a stencil to create designs by applying pigment.",
          "Stenciling-style, the art of creating repeatable designs using a stencil.",
          "Stenciling-style, creating sharp designs by applying pigment over a stencil.",
          "Stenciling-style, using a stencil to create and replicate designs by applying pigment.",

        ]
      },
      {
        title: "Mosaic",
        thumbnail: "techniques/mosaic.png",
        prompts: [

          "Mosaic-style, small pieces of colored glass, stone, or other materials to form an image or pattern.",
          "Mosaic-style, composing intricate designs using tiny, colored fragments in a bed of mortar.",
          "Mosaic-style, using tesserae to create detailed images and patterns.",
          "Mosaic-style, applying the method of creating images with an assemblage of small pieces of colored material.",
          "Mosaic-style, creating intricate designs by assembling small, colored pieces.",
          "Mosaic-style, utilizing colored tiles or stones to form a picture or pattern.",
          "Mosaic-style, arranging small pieces of colored material to construct an intricate image.",
          "Mosaic-style, using tesserae in a method reminiscent of the intricate, timeless style of Mosaic.",
          "Mosaic-style, forming images or patterns from tiny fragments of colored material.",
          "Mosaic-style, creating detailed images from small, colored tiles or stones.",
          "Mosaic-style, utilizing an assemblage of small, colored pieces to create detailed designs.",
          "Mosaic-style, constructing an intricate design with small pieces of colored glass, stone, or other material.",
          "Mosaic-style, using a multitude of small, colored pieces to form intricate images or patterns.",
          "Mosaic-style, arranging tiny fragments of colored material into an image or pattern.",
          "Mosaic-style, creating artwork with small pieces of colored glass, stone, or other materials.",
          "Mosaic-style, forming intricate patterns using small, colored fragments.",
          "Mosaic-style, designing images using small, colored pieces of various materials.",
          "Mosaic-style, the process of assembling small, colored fragments to create a larger design.",
          "Mosaic-style, using tesserae to construct an intricate pattern or image.",
          "Mosaic-style, the art of assembling small pieces of colored material to create intricate designs.",

        ]
      },
      {
        title: "Tapestry",
        thumbnail: "techniques/tapestry.png",
        prompts: [

          "Tapestry-style, weaving colored threads to create complex pictorial designs.",
          "Tapestry-style, using weft-faced weaving where all the warp threads are hidden in the completed work.",
          "Tapestry-style, creating rich, decorative images using woven threads.",
          "Tapestry-style, utilizing woven fabric to depict intricate, often narrative scenes.",
          "Tapestry-style, creating a picture or pattern by weaving colored weft threads on a loom.",
          "Tapestry-style, the art of weaving threads to produce a detailed image or design.",
          "Tapestry-style, constructing pictorial or patterned designs using colored threads.",
          "Tapestry-style, weaving a picture or design using various colored threads.",
          "Tapestry-style, utilizing the ancient technique of creating pictorial designs through weaving.",
          "Tapestry-style, weaving intricate designs or scenes using colored threads.",
          "Tapestry-style, the process of creating detailed, colorful designs using woven threads.",
          "Tapestry-style, constructing a design or image through the meticulous weaving of colored threads.",
          "Tapestry-style, creating art by weaving colored threads into a picture or pattern.",
          "Tapestry-style, using a loom to weave colored threads into a design or picture.",
          "Tapestry-style, creating a pictorial or patterned design through the art of weaving.",
          "Tapestry-style, the art of weaving colored threads to create a detailed image or pattern.",
          "Tapestry-style, weaving colored threads on a loom to create a detailed picture or design.",
          "Tapestry-style, using the technique of weaving to create a design or image using colored threads.",
          "Tapestry-style, creating a rich, decorative design by weaving colored threads.",
          "Tapestry-style, the process of creating images or designs by weaving colored threads.",

        ]
      },
      {
        title: "Charcoal Drawing",
        thumbnail: "techniques/charcoal.png",
        prompts: [

          "charcoal-style, using charcoal sticks to create dark, intense lines and shadows.",
          "charcoal-style, exploiting the smudgability of charcoal to create smooth transitions between light and dark areas.",
          "charcoal-style, applying charcoal to create expressive sketches and drawings.",
          "charcoal-style, creating images with the rich blacks and the subtle gradations of charcoal.",
          "charcoal-style, utilizing the contrast and depth provided by charcoal to create dramatic drawings.",
          "charcoal-style, using charcoal for its deep blacks, variety of tones, and high level of control.",
          "charcoal-style, sketching with charcoal to create a range of tones and textures.",
          "charcoal-style, creating art with the deep, dark lines characteristic of charcoal drawing.",
          "charcoal-style, using charcoal's malleability to blend, smudge, and create a variety of effects.",
          "charcoal-style, drawing with charcoal to create intense, high-contrast images.",
          "charcoal-style, with dark intensity and high contrast of charcoal.",
          "charcoal-style, expressive, high-contrast drawings.",
          "charcoal-style, applying the rich, dark tones of charcoal to create striking images.",
          "charcoal-style, using charcoal's smudgability and range of tones to create complex drawings.",
          "charcoal-style, creating images with the rich blacks, high contrast, and subtle gradations possible with charcoal.",
          "charcoal-style, applying the intense darkness and smudgeable nature of charcoal to create expressive drawings.",
          "charcoal-style, creating art with the rich blacks and smooth transitions characteristic of charcoal.",
          "charcoal-style, sketching with charcoal to create expressive images with high contrast and varied tones.",
          "charcoal-style, utilizing charcoal for its deep blacks and high level of control in creating drawings.",
          "charcoal-style, using charcoal's unique properties to create drawings with high contrast and a wide range of tones.",

        ]
      },
      {
        title: "Etching",
        thumbnail: "techniques/etching.png",
        prompts: [

          "etching-style, using acid to cut into the unprotected parts of a metal surface to create a design.",
          "etching-style, applying acid to create designs in metal, utilizing the resistant ground to protect the design.",
          "etching-style, creating images through the process of incising a design onto a surface using acid.",
          "etching-style, using acid to etch designs into a metal surface.",
          "etching-style, creating images with lines and tones etched into a metal plate.",
          "etching-style, utilizing the technique of etching to create designs in a metal surface using acid.",
          "etching-style, creating a design by incising into a surface and using acid to bite into the material.",
          "etching-style, using acid to bite into metal, creating a detailed image or design.",
          "etching-style, creating art by etching designs into a metal surface using acid.",
          "etching-style, applying the method of etching to incise designs into a metal surface.",
          "etching-style, creating detailed designs by etching into a metal surface.",
          "etching-style, utilizing the technique of etching to create a design in a metal surface.",
          "etching-style, etching a design into metal, using acid to create detailed images.",
          "etching-style, creating designs by incising into a metal surface and using acid to deepen the incisions.",
          "etching-style, using acid to etch a design into a metal surface.",
          "etching-style, creating a detailed design by etching into a metal surface using acid.",
          "etching-style, utilizing the process of etching to create a design in a metal surface.",
          "etching-style, creating art by using acid to etch a design into a metal surface.",
          "etching-style, etching designs into a metal surface to create a unique, detailed image.",
          "etching-style, using acid to etch designs into metal, creating detailed and intricate artwork.",

        ]
      },
      {
        title: "Digital Painting",
        thumbnail: "techniques/digital-painting.png",
        prompts: [
          "style of digital paintings, with smooth gradients and blended colors.",
          "bearing the hallmarks of digital artistry, with its hyper-realistic textures and details.",
          "precise color control and flawless blending that digital painting allows.",
          "lush, vibrant colors and precise details characteristic of digital painting.",
          "with the unique aesthetic of digital painting, blending photorealistic details with artistic embellishments.",
          "infinite color palette and precise control of digital painting.",
          "crisp lines and smooth transitions of a digital painting.",
          "unlimited texture possibilities that digital painting provides.",
          "detail and vibrancy characteristic of digital painting.",
          "limitless possibilities of digital painting in its rich colors and textures.",
          "in the unique style of a digital painting, with vivid colors and intricate details.",
          "digital painting aesthetic with its intense color saturation and precise detail.",
          "embracing the flawless blending and limitless palette of digital painting.",
          "stunning realism and vibrant color that digital painting can achieve.",
          "embodying the smooth transitions and precise control that define digital painting.",
          "digital painting style, with its bright, vibrant colors and clear lines.",
          "revealing the unlimited potential of digital painting in its vivid colors and photorealistic details.",
          "presenting the digital painting aesthetic with its smooth gradients and crisp details.",
          "with the precise lines and high-resolution textures typical of digital painting.",
          "digital painting aesthetic, with its seamless blending and limitless color palette.",

        ]
      },
      {
        title: "Pixel Art",
        thumbnail: "techniques/pixel-art.png",
        prompts: [
          "featuring the charm and retro aesthetic of pixel art.",
          "pixel-perfect precision and nostalgic appeal of pixel art.",
          "style of pixel art, with its blocky shapes and limited color palette.",
          "crisp, geometric forms and bright, simple colors that define pixel art.",
          "with the stylized look and grid-based aesthetic characteristic of pixel art.",
          "embracing the retro charm and digital simplicity of pixel art.",
          "vibrant colors and geometric precision of pixel art.",
          "minimalist, nostalgic aesthetic of pixel art.",
          "featuring the blocky aesthetic and bright colors characteristic of pixel art.",
          "simplicity and charm of pixel art with its geometric shapes and limited colors.",
          "in the pixel art style, with its precise, geometric forms and vibrant colors.",
          "pixel-perfect precision and simple aesthetic of pixel art.",
          "presenting the charming aesthetic of pixel art, with its blocky forms and bright colors.",
          "with the geometric precision and nostalgic charm typical of pixel art.",
          "embracing the simplicity and retro charm of pixel art.",
          "crisp lines, vibrant colors, and retro appeal of pixel art.",
          "blocky aesthetic and simplistic charm of pixel art.",
          "presenting the geometric forms and vibrant colors that define pixel art.",
          "minimalist aesthetic and vibrant colors of pixel art.",
          "embodying the charm and simplicity of pixel art, with its geometric forms and bright colors.",
        ]
      },
    ]
  }
];

function App() {

  const [motiveInput, setMotiveInput] = useState("");
  const [activeStylePrompt, setActiveStylePrompt] = useState("");
  const [selectableStylePrompts, setSelectableStylePrompts] = useState<Array<string>>([]);
  const [generatedPrompt, setGeneratedPrompt] = useState("");

  useEffect(
    () => {
      if (motiveInput.trim().length > 0) {
        const promptParts = [];
        if (motiveInput.trim().length > 0) {
          promptParts.push(motiveInput.trim());
        }
        if (activeStylePrompt.trim().length > 0) {
          promptParts.push(activeStylePrompt.trim());
        }
        setGeneratedPrompt(promptParts.join(', '));
      } else {
        setGeneratedPrompt('');
      }
    },
    [motiveInput, activeStylePrompt]
  );

  const onStyleButtonClick = (prompts: Array<string>) => {
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    setActiveStylePrompt(randomPrompt);
    setSelectableStylePrompts(prompts);
  }

  const onRegenerateClicked = () => {
    const randomPrompt = selectableStylePrompts[Math.floor(Math.random() * selectableStylePrompts.length)];
    setActiveStylePrompt(randomPrompt);
  }

  return (
    <>
      <HStack as="header" position="fixed" top={-5} width="100%" height={150} zIndex={100}>
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
              <HStack>
                <CopyToClipboard text={generatedPrompt}>
                  <Button
                    colorScheme="blue"
                    isDisabled={generatedPrompt?.trim().length === 0}
                  >🗋 copy</Button>
                </CopyToClipboard>
                <Button
                  colorScheme="blue"
                  onClick={onRegenerateClicked}
                  isDisabled={selectableStylePrompts.length === 0 || motiveInput.length === 0}
                >⟳ regenerate</Button>
              </HStack>
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
      <HStack align="start" justifyContent="space-between" style={{ marginTop: 170 }}>
        <Card width={"100%"}>
          <CardBody>

            <Tabs>
              <TabList>
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
                        onClick={() => onStyleButtonClick(style.prompts)}
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
                            src={style.thumbnail ?? 'not-found-150-150.png'}
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
        <Card minWidth={200} width={200}>
          <CardBody>
            <Box>
              <Text marginBottom={2}>Enter a description of a motive, for example &quot;A cat lying on a sofa&quot;.</Text>
              <Text marginBottom={2}>Choose an art style.</Text>
              <Text marginBottom={2}>If you like the generated Midjourney prompts, copy and use it.</Text>
              <Text marginBottom={2}>If not, use the &quot;regenerate&quot; Button, to get a different prompt for the same style.</Text>
            </Box>
          </CardBody>
        </Card>
      </HStack >
    </>
  );
}

export default App
