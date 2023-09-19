type Config = {
	host: string;
	i: string;
	master?: string;
	wsUrl: string;
	apiUrl: string;
	defaultVisibility: string;
	defaultlocalOnly: boolean;
	keywordEnabled: boolean;
	reversiEnabled: boolean;
	notingEnabled: boolean;
	chartEnabled: boolean;
	serverMonitoring: boolean;
	pollEnabled: boolean;
	mazeAutoPostEnabled: boolean;
	mecab?: string;
	mecabDic?: string;
	memoryDir?: string;
};

const config = require('../config.json');

config.wsUrl = config.host.replace('http', 'ws');
config.apiUrl = config.host + '/api';

export default config as Config;
