import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "设置",
};

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-normal">设置</h1>
        <p className="mt-2 text-muted-foreground">这里之后可以配置店铺资料和管理设置。</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>店铺资料暂未开放</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-6 text-muted-foreground">
            当前店铺地址、电话和营业时间仍在项目配置中维护。后续如果需要，可在这里加入可编辑设置。
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
