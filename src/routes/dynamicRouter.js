import { menus } from '@/API/testApi';

let DRoutes = [];

function generateList (data) {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const { id,path,name, children, level } = node;
    DRoutes.push({
      key: id,
      path,
      component: level === 1 && children && children.length ? '' : name,
    });
    if (node.children) {
      generateList(node.children);
    }
  }
};

/**
 * @description 初始化动态路由
 */
async function getRoutes () {
  const res = await menus();
  generateList(res.data ? res.data : []);
}
await getRoutes();

export default DRoutes;