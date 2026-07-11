import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "服务项目",
};

export default function AdminServicesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-normal">服务项目</h1>
          <p className="mt-2 text-muted-foreground">这里之后可以管理店里的服务名称、价格、时长和展示顺序。</p>
        </div>
        <Button disabled>新增服务</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>服务管理暂未开放</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-6 text-muted-foreground">
            当前服务内容仍通过数据库种子和后台数据维护。后续如果需要，可在这里加入新增、编辑和排序功能。
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
