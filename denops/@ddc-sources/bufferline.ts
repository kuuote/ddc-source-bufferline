import {
  BaseSource,
  GatherArguments,
  GetCompletePositionArguments,
} from "https://deno.land/x/ddc_vim@v3.7.2/base/source.ts";
import { Item } from "https://deno.land/x/ddc_vim@v3.7.2/types.ts";
import {
  ensure,
  isArrayOf,
  isString,
} from "https://deno.land/x/unknownutil@v3.2.0/mod.ts";

type Params = Record<never, never>;

export class Source extends BaseSource<Params> {
  override getCompletePosition(
    args: GetCompletePositionArguments<Params>,
  ): Promise<number> {
    return super.getCompletePosition(args);
  }

  override async gather(args: GatherArguments<Params>): Promise<Item[]> {
    const lines = await args.denops.call("ddc#source#bufferline#collect");
    return ensure(lines, isArrayOf(isString))
      .map((word) => ({
        abbr: word.replaceAll("\t", "\\t"),
        word,
      }));
  }

  override params(): Params {
    return {};
  }
}
