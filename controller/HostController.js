var GetHostUseCase = require('../useCase/hostManagement/GetHostsUseCase');
var HostViewModel = require('../viewModel/HostViewModel')

class HostController {
    constructor() {
        this._hostViewModel = new HostViewModel();
    }

    async getHosts() {
        let getHostsUseCase = new GetHostsUseCase(entityContext);
        let hostDTOList = await getHostsUseCase.execute();
        this._hostViewModel._hostDTOList = hostDTOList;
    }
}

module.exports = HostController;