import path from "path"
import type { AliasOptions }  from "vite"

const aliaConfig:AliasOptions | undefined = {
    "@":path.resolve(__dirname,"../src")
}
export {aliaConfig}