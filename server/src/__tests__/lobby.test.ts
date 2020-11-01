import { LobbyStatus } from "../metadata/types";
import repository, { Lobby } from "../repository";

describe('lobby', () => {
  it('shuts down correctly after game ends', () => {
    jest.useFakeTimers();
    const lobby = new Lobby(12306, 'admin');
    lobby.setCountdown(1);
    lobby.startGames();

    // Finishes after 1 second
    jest.advanceTimersByTime(1000);
    expect(lobby.status).toBe(LobbyStatus.Finished);

    // Should be destroyed after 2 hrs
    jest.advanceTimersByTime(2 * 60 * 60 * 1000);
    expect(repository.adminLobbies.admin.length).toBe(0);
    expect(repository.lobbies[12306]).toBeUndefined();
  });
});