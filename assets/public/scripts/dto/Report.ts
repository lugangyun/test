export class Report {
    /**
     * 训练Id
     */
    public trainingId: string;

    /**
     * 学生Id
     */
    public studentId: number;

    /**
     * 旧系统学生Id
     */
    public oldStudentId: string;

    /**
     * 教师Id
     */
    public teacherId: number;

    /**
     * 入口类型
     */
    public entranceType: number;

    /**
     * 训练任务Id
     */
    public trainingTaskId: number;

    /**
     * 训练等级
     */
    public trainingLevel: number;

    /**
     * 完成题目数量
     */
    public completionCount: number;

    /**
     * 题目总数
     */
    public totalCount: number;

    /**
     * 训练报告详细信息
     */
    public details: ReportDetial[];

    /**
     * 清空报告数据
     */
    public clear(): void {
        this.details = [];
    }

    /**
     * 计算正确题目数量
     */
    public getCorrectCount(): number {
        return this.details.filter(x => x.isRight).length;
    }

    /**
     * 计算正确平均反应时
     */
    public getCorrectAvgRecTime(): number {
        var rightDetails = this.details.filter(x => x.isRight);
        var count = rightDetails.length;
        var totalTime = 0;

        // reduce要求数据长度大于0
        if (rightDetails.length > 0) {
            totalTime = rightDetails.map(x => x.reactionTime)
                .reduce((x1, x2) => {
                    return x1 + x2;
                });
        }

        return count > 0 ? totalTime / count : 0;
    }
}