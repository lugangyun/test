import { AppConfig } from "./AppConfig";
import { Report } from "./dto/Report";

export default class ServerInfo {
	public studentId: number;
	public oldStudentId: string;
	public entranceType: number;
	public trainingTaskId: number;
	public studentTaskId: number;
	public materialType: string;

	public trainingId: string;
	public trainingNameEn: string;
	public trainingName: string;
	public trainingLevel: string;
	public reportType: string;

	private tokenType: string;
	private token: string;
	public authorization: string;
	private setting: AppConfig;

	private static _instance: ServerInfo;

	public static getInstance(): ServerInfo {
		if (!this._instance) {
			this._instance = new ServerInfo();
		}
		return this._instance;
	}

	private constructor() {
		this.studentId = +this.GetQueryString("studentId");
		this.oldStudentId = this.GetQueryString("oldStudentId") || undefined;
		this.trainingId = this.GetQueryString("trainingId");
		this.trainingLevel = this.GetQueryString("trainingLevel") || "";
		this.entranceType = +this.GetQueryString("entranceType") || 0;
		this.materialType = this.GetQueryString("materialType") || "";
		this.trainingLevel = this.GetQueryString("trainingLevel");
		this.trainingTaskId = +this.GetQueryString("trainingTaskId");
		this.studentTaskId = +this.GetQueryString("studentTaskId");

		this.tokenType = this.GetQueryString("tokenType") || "Bearer";
		this.token = this.getCookie("Abp.AuthToken");
		this.authorization = this.tokenType + " " + this.token;
	}

	public getSetting() {
		return new Promise((resolve, reject) => {
			cc.loader.loadRes("appconfig", cc.JsonAsset, undefined, (error, resource) => {
				this.setting = resource.json;
				resolve();
			});
		})
	}

	private GetQueryString(name): string {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		return r != null ? r[2] : null;
	}

	public async getTrainingInfo() {
		if (this.setting.defaultGame) {
			this.trainingName = "调试页面";
			this.trainingNameEn = this.setting.defaultGame;
		}
		else {
			var training = await this.sendRequest("get",
				`${this.setting.server}GetTraining?id=${this.trainingId}&studentTaskId=${this.studentTaskId}`, null);
			this.trainingName = training.name;
			this.trainingNameEn = training.nameEn;
			this.reportType = training.reportType || "base";
			this.setting.reportServer += this.reportType + "/";
		}
		document.getElementsByTagName("title")[0].innerHTML = this.trainingName;
	}

	public async saveReport(input: Report): Promise<string> {
		input.trainingId = this.trainingId;
		input.studentId = this.studentId;
		input.oldStudentId = this.oldStudentId;
		input.entranceType = this.entranceType;
		input.trainingTaskId = this.trainingTaskId;
		let xhr = new XMLHttpRequest();
		xhr.open('post', this.setting.server + "SaveTrainingProcessAndReport");
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.setRequestHeader("Authorization", this.authorization);
		xhr.send(JSON.stringify(input));

		return new Promise((resolve, reject) => {
			xhr.onreadystatechange = function (this) {
				if (this.readyState == 4 && this.status == 200) {
					let response = JSON.parse(this.responseText);
					resolve(response.result);
				}
			}
		});
	}

	public openReport(reportId: string) {
		window.open(this.setting.reportServer + reportId);
	}

	private async sendRequest(type: string, url: string, sendData: string): Promise<any> {
		return new Promise((resolve, reject) => {
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function () {
				if (xhr.readyState == 4 && xhr.status == 200) {
					var data = JSON.parse(xhr.responseText);
					if (data.success) {
						var output = data.result;
						resolve(output);
					} else {
						reject("服务器内部错误，错误代码：" + xhr.status);
					}
				}
				else if (xhr.readyState == 4) {
					reject("网络连接错误，错误代码：" + xhr.status);
				}
			};
			xhr.open(type, url);
			xhr.setRequestHeader("Content-type", "application/json");
			xhr.setRequestHeader("Authorization", this.authorization);
			xhr.send(sendData);
		});
	}

	public getCookie(c_name: string): string {
		var c_start: number;
		var c_end: number;
		if (document.cookie.length > 0) {
			c_start = document.cookie.indexOf(c_name + "=");
			if (c_start != -1) {
				c_start = c_start + c_name.length + 1;
				c_end = document.cookie.indexOf(";", c_start);
				if (c_end == -1) {
					c_end = document.cookie.length;
				}
				return document.cookie.substring(c_start, c_end);
			}
		}
		return "";
	}
}
