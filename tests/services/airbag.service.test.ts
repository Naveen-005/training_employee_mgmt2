import { AirbagService, CrashSensor, AirbagIgniter} from '../../services/airbag.service';
import {mock, MockProxy} from 'jest-mock-extended'
import {when} from 'jest-when'

describe('AirbagService', () => 
{
    let sensorMock: MockProxy<CrashSensor>;
    let igniterMock: MockProxy<AirbagIgniter>;
    let service: AirbagService;

    beforeEach(() => {
        sensorMock = mock<CrashSensor>();
        igniterMock = mock<AirbagIgniter>();
        service = new AirbagService(sensorMock, igniterMock);
    });


    it('deploys the airbag when a crash is detected', () => {

        when(sensorMock.isCrashDetected).calledWith().mockReturnValue(true);

        const result = service.deployAirbag();
        expect(result).toEqual({ triggered: true, force: 100, timing: 50 });
        expect(sensorMock.isCrashDetected).toHaveBeenCalled();
        expect(igniterMock.trigger).toHaveBeenCalledWith(100,50)
    });

    it('Does not deploy airbag when a crash is not detected', () => {
        
        when(sensorMock.isCrashDetected).calledWith().mockReturnValue(false);

        const result = service.deployAirbag();
        expect(result).toEqual({ triggered: false });
        expect(sensorMock.isCrashDetected).toHaveBeenCalled();
        expect(igniterMock.trigger).not.toHaveBeenCalled();
    })

})