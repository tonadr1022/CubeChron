import { Scrambow } from "scrambow";
// import { CubeTypeKey } from "@/shared/types";
interface IGetScramble {
  cubeType: String;
  numScrambles?: number;
}
export const getScramble = ({ cubeType }: IGetScramble): string => {
  let scramble = "";
  // return new Scrambow().get(1)[0].scramble_string;
  switch (cubeType) {
    case "222":
      scramble = new Scrambow().setType("222").get(1)[0].scramble_string;
      break;
    case "333":
    case "333bf":
    case "333fm":
    case "333oh":
    case "333ft":
    case "333mbf":
      scramble = new Scrambow().setType("333").get(1)[0].scramble_string;
      break;
    case "444":
    case "444bf":
      scramble = new Scrambow().setType("444").get(1)[0].scramble_string; // 40
      break;
    case "555":
    case "555bf":
      scramble = new Scrambow().setType("555").get(1)[0].scramble_string; // 40
      break;
    case "666":
    case "666oh":
      scramble = new Scrambow().setType("666").get(1)[0].scramble_string; // 40
      break;
    case "777":
    case "777oh":
      scramble = new Scrambow().setType("777").get(1)[0].scramble_string; // 40
      break;
    case "skewb":
      scramble = new Scrambow().setType("skewb").get(1)[0].scramble_string; // 40
      break;
    case "minx":
      scramble = new Scrambow().setType("minx").get(1)[0].scramble_string; // 40
      break;
    case "pyram":
      scramble = new Scrambow().setType("pyram").get(1)[0].scramble_string; // 40
      break;
    case "sq1":
      scramble = new Scrambow().setType("sq1").get(1)[0].scramble_string; // 40
      break;
    default:
      return "No Scramble";
  }
  return scramble;
};
