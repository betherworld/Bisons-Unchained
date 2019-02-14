pragma solidity >=0.4.22 <0.6.0;
import "./proposalfactory.sol";

// This contract handles all logic containing the voter. Here the voter
// can request his pay in votes for completing a specifig assignment,
// vote for proposals and so on.
contract Voting is ProposalFactory{
    event NewVoter(uint voterId, uint voteCount);
    
    // Room for more data the individual voter.
    struct Voter {
        uint16 countVotes;
    }
    
    // Contains all voters. The index represents a very basic ID of
    // the individual voter.
    Voter[] public voters;
    
    // Mapping from user ID to address.
    mapping (uint => address) public voterToOwner;
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
    
    // Consider deleting.
    function createAccount() public {
        uint id = voters.push(Voter(0)) - 1;
        voterToOwner[id] = msg.sender;
        emit NewVoter(id, 0);
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
        return sender.countVotes;
    }
    
    // Sender chooses by name the proposal he'd like to vote for and and also chooses 
    // the amount of votes.
    function payVotes(string memory _name, uint _voteCount) public {
        Voter storage sender = addressToVoter[msg.sender];
        
        require(_voteCount <= sender.countVotes);
        
        bytes32  conv = stringToBytes32(_name);
        uint id = nameToId[conv];
        Proposal storage curProposal = proposals[id];
        
        curProposal.countVotes += _voteCount;
        sender.countVotes -= uint16(_voteCount);
    }
    
    
}