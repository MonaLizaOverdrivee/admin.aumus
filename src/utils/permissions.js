// import { defineAbility, createAliasResolver, AbilityBuilder } from "@casl/ability";
// // import store from "../store"
// // const routes = ["/", "/pages", "/stats", "/errors"];
// // const role = "manager";
// // const viewer = store.getters["auth/manger"]
// // const editor = store.state.auth.user.pageEditors

// const resolveAction = createAliasResolver({
//   modify: ["create", "change"],
// });

// export default defineAbility(
//   (can) => {
//     // if (role === "admin") return can("manage", "all");

//     can("modify", "editor");
//     can("change", "contentManager");

//     // for (const iterator of routes) {
//     //   console.log(iterator);
//     //   can("access", iterator);
//     // }
//   },
//   { resolveAction }
// );
import { Ability, AbilityBuilder } from "@casl/ability";

export const ability = new Ability()
export function updatePermissions(accessParam) {
  const { can, rules } = new AbilityBuilder();

  if (accessParam.role === "admin") {
    can("manage", "all");
  } else {
    can("create", "editor");
    can("change", "editor");
    can("change", "contentManager");
    for (const iterator of accessParam.modules) {
      can("access", iterator);
    }
  }


  ability.update(rules);
}
