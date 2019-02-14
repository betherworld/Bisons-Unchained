pragma solidity >=0.4.22 <0.6.0;


// This contract handles all logic containing the voter. Here the voter
// can request his pay in votes for completing a specifig assignment,
// vote for proposals and so on.
contract Voting{
    
    // Notification when user gets votes.
    event NewIncrVotes(uint countVotes, address senderAddress);
    
    // Room for more data the individual voter.
    struct Voter {
        uint16 countVotes;
        string name;
    }
    
    // Mapping from address to the linked voter.
    mapping (address => Voter) addressToVoter;
    
    // List of current dummy assignments containing vote values.
    uint[] public assignmentList;
    
    // We simply put two assignments into the list with 2 different vote values.
    // This is for demonstration only.
    constructor() public{
        assignmentList.push(5);
        assignmentList.push(10);
    }
    
    // Return number of vounts of sender.
    function getVotes() public view returns(uint) {
        Voter storage sender = addressToVoter[msg.sender];
        return sender.countVotes;
    }

    
    // Dummy verification process if certain assignment has acutually been done.
    // This is just to indicate that there should be a certain process which
    // would replace the modifier with an actual contract for example.
    modifier askOracle(uint _assignmentId) {
        _;
    }
    
    // Sender calls this function whenever he wants to earn his votes from a certain task.
    // A dummy oracle verfies the request.
    function incrVotes(uint _assignmentId) external askOracle(_assignmentId) returns(uint){
        Voter storage sender = addressToVoter[msg.sender];
        sender.countVotes += uint16(assignmentList[_assignmentId]);
        emit NewIncrVotes(sender.countVotes, msg.sender);
        return sender.countVotes;
    }
    
    function _decreaseVotes(uint _value) internal {
        Voter storage sender = addressToVoter[msg.sender];
        sender.countVotes -= uint16(_value);
    }
    
    
}