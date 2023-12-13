// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

//!CourseMarketPlace
contract CourseMarketPlace {
    //State of buyed course
    enum State {
        Purchased,
        Activated,
        Deactivated
    }

    //Course object
    struct Course {
        uint id;
        uint price;
        bytes32 proof;
        address owner;
        State state;
    }

    //mapping of courseHash to Course data
    mapping(bytes32 => Course) private ownedCourses;

    //mapping of courseId to courseHash
    mapping(uint => bytes32) private ownedCourseHash;

    //Total number of course owned to current user
    uint private totalOwnedCourse;

    ///Course has already a Owner!
    error CourseHasOwner();

    /// Only owner has an access!
    error OnlyOwner();

    //Adress of the owner of the contract
    address payable private owner;

    //Constructor works only once
    constructor() {
        setContractOwner(msg.sender);
    }

    //purchase course from current user
    function purchaseCourse(bytes16 courseId, bytes32 proof) external payable {
        bytes32 courseHash = keccak256(abi.encodePacked(courseId, msg.sender));
        if (hasCourseOwnerShip(courseHash)) {
            revert CourseHasOwner();
        }

        uint id = totalOwnedCourse++;
        ownedCourseHash[id] = courseHash;
        ownedCourses[courseHash] = Course({
            id: id,
            price: msg.value,
            proof: proof,
            owner: msg.sender,
            state: State.Purchased
        });
    }

    //get number of course owned to current user
    function getCourseCount() external view returns (uint) {
        return totalOwnedCourse;
    }

    //get course match to hash index
    function getCourseHashAtIndex(uint index) external view returns (bytes32) {
        return ownedCourseHash[index];
    }

    //get course instance using coursehash
    function getCourseByHash(
        bytes32 courseHash
    ) external view returns (Course memory) {
        return ownedCourses[courseHash];
    }

    // get contract owner well you now who ise deploy this contract
    function getContractOwner() public view returns (address) {
        return owner;
    }

    //check course is already i
    function hasCourseOwnerShip(
        bytes32 courseHash
    ) private view returns (bool) {
        return ownedCourses[courseHash].owner == msg.sender;
    }

    function setContractOwner(address newOwner) private {
        owner = payable(newOwner);
    }

    function transferOwnerShip(address newOwner) external onlyOwner {
        setContractOwner(newOwner);
    }

    modifier onlyOwner() {
        if (msg.sender != getContractOwner()) {
            revert OnlyOwner();
        }
        _;
    }
}
