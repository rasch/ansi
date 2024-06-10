import { ansi, color } from "../index.js"

const fg = color.set

console.log(ansi(`
     My skin is kind of sort of ${fg("#b66827")}brownish
          ${fg("#fd5ca8")}Pinkish {yellow}yellowish {white}white{default}.
      My eyes are {gray}greyish {cyan}blueish {green}green{default},
 But I'm told they look ${fg("#ff851b")}orange{default} in the night.
      My hair is {red}reddish ${fg("#fdeb75")}blondish ${fg(94)}brown{default},
        But it's ${fg(247)}silver{default} when it's wet.
        And all the {bold}{red}c{green}o{blue}l{yellow}o{cyan}r{magenta}s{default}{/bold} I am inside
         Have not been invented yet.
             {italic}{dim}~Shel Silverstein{/dim}{/italic}
`))
