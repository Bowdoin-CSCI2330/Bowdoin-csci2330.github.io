## Using a Version Control System (Git)

An critical tool in a programmer's toolchest is a good version control system (VCS). A VCS is used to track changes to documents, to manage multiple users' access to files, and to help merge changes from those same users into one copy of the code. Here at Bowdoin, you should care about version control in the context of working on a program in a group and keeping a history of your own work. Conventional ways of working in a group include (1) having one person do all the coding, (2) emailing or otherwise sending the updated program files between group members every time someone makes changes, or (3) always sitting in front of the same computer together when working. All of these options are either inefficient or limiting, and using a VCS is a much more flexible approach.

As with text editors, there are several widely-used VCSes to choose from. The two most common options are Git and Subversion (aka svn). Git is the newer, fancier, and more popular version control system, though Subversion is still used for many projects. It is a bit more complex in that it allows for *distributed* version control which does not require a central server. In our work, we will be using a central server, [GitHub](https://github.com). You will find all the basic concepts of version control (revisions, updating, committing, etc) are similar across systems (git, Subversion, etc.).

The setup of git we will be using is shown in the figure below. It consists of a git server (run by GitHub) which holds the "master" copies of the files that we wish to collaborate on. Users (or "clients") never actually modify the master files directly -- instead, they maintain a local copy of all the files that they can edit. Periodically, clients commit their changes locally and send (or "push") their updated files to the server, which informs the server that the master copy of the files should be updated appropriately. Clients will also periodically ask the server to send them all file updates that have been sent to the server in the meantime (this is called a "pull"), and then merge those changes with their local copies. This will keep them in sync with other clients using the same files. The important point here is that at any given time, there can be multiple copies of the same files -- the "authoritative" copies are located on the server, and the "working" copies are located on the client machines. The clients share their edits with each other via the server through updates and commits. As long as clients are regularly committing and pushing their changes and pulling and merging others' changes via updates, the clients' local copies will remain mostly in-sync.

For example, suppose *Client 1* and *Client 2* both have local copies of a file, `foo.txt`, that is being shared by a git server. *Client 1* updates their local copy of `foo.txt`. At this point, *Client 1* has a different version of the file from both the server and *Client 2*. When they are ready to save their changes, *Client 1* `commit`s their changes to their local git repository. At this point the changes are all still on *Client 1*'s computer only, both within git and their working directory. To share the changes, *Client 1* then `push`es the changes to the server. At this point *Client 1* and the server both have updated copies of the file, but *Client 2* does not, they still have the old version. Some time later, *Client 2* issues a `pull` request to the server. The server notices that the master copy of `foo.txt` is more recent than *Client 2*'s local (both git and working) copy, so the new version (which was changed by *Client 1*) is sent to *Client 2*. If there are incompatible changes that git cannot easily resolve, *Client 2* will be asked to `merge` those changes. This is where most people get quickly confused about what git is asking them to do and how to do it. In most cases, git will manage the merge and both *Client 1* and *Client 2* will again be in sync with each other, despite never working on each other's files directly.

There are a number of more complex workflows with git that we won't cover here. As you are working alone, you should not run into any tricky merge situations unless you try to edit code across different sytems and forget to issue a `pull` at the start of your work session.

Let's try out git using GitHub. First `cd` back to your home directory. Now, we want to create a local copy of the remote file repository that we can view and edit. This is called `clone`ing the repository, and is accomplished using the command `git clone`, as such:

```bash
git clone https://github.com/Bowdoin-CSCI2330/sample-repository.git sample-project
```

This command says to make a copy (`clone`) of the repository located at the above URL into a directory named `sample-project`. Enter the URL exactly as shown above (using `Bowdoin-CSCI2330` in the name) - this is part of our course on GitHub that is publicly accessible for this exercise. If prompted, enter your GitHub credentials (probably answer 'no' if you get a warning about storing your password unencrypted), and you should be able to clone the directory. Doing so will create a directory called `sample-project` in your current working directory (named since that was the lowest-level directory of the URL that was `clone`d out). This new directory is both your local copy of the git repository and a working copy that you can make changes in.
Important: `clone`ing out out a repository is normally a one-time action that you do when first getting set up. While `commit`s, `push`es, and `pull`s happen often while working, you should not normally need to use the `clone` command more than once (unless you are starting to work with a new repository).

`cd` into your new checked-out repository. At any time, you can use the `git status` command to show whatever changes you have made to your local copy of the repository that you haven't yet `commit`ted, and `push`ed back to the server. Try running that now -- since you just checked out the repository, it should not show you anything.

Now let's try adding a new file to the repository. Create a text file and store some text in it (remember that anything you put here will be viewed by everyone else checking out the same repository!). Run `git status` again and it should show that there is a new *untracked* file in your local repository that isn't tracked by git (indicated by the question mark). First let's mark that file to tell git that we want to add it to the repository:

```bash
git add [filename]
```

After adding the file, if we run `git status` again, the output shows that we have marked the file for addition to the repository. However, we still haven't actually `commit`ted our changes to the repository. For that, we need to run the `git commit` command.

```bash
git commit -m "added a new file"
```

This command says to save our local changes into a special `.git` directory. This is our local history of all the changes made in the repository. As you just `commit`ted the changes, they are not yet saved to the server. The -m flag is used to pass a 'commit message' (basically like a comment describing the commit). You can use any descriptive text for the commit message. If you don't specify a commit message, git will dump you into an editor window, which unfortunately (for beginners) is `vim` by default. If this happens, to quit `vim`, type `:wq` and press enter.

To send your changes to the server, you need to `push` them. Run the `git push` command:

```bash
git push
```

Now, your changes are sent to the git server. In our case, GitHub. You can go to GitHub's web interface and check that your changes were indeed integrated into all the other files.


In general, before you ever `commit`, you should `pull` (i.e., pull down other client's changes to the repository) by calling `git pull`:


```bash
git pull
```

Try `pull`ing now. If anyone else has `push`ed any changes to the repository between the time you `clone`d the repository (or your most recent `git pull`) and now, those changes will download and be applied to your local copy. Rule of thumb is to `pull` frequently, as it minimizes the chance that you will accidentally try to apply conflicting changes (in which case git will require you to make decisions about how to resolve the conflict -- i.e., whose changes should stick).

Now that you've added a new file, let's try changing an existing file. First, do another status to check that you have no outstanding changes. Since you just `commit`ted your new file, you should no longer have any changes and the status should output nothing. Now, let's edit the file you just added. Open it up in an editor and change its contents. Now do another `git status` and you should see that you have pending modifications to your file. Do another `commit` and `push` those changes out to the server.

Git (and other VCSes) have many more capabilities, such as undoing recent changes and rolling back your files to their state at the time of earlier commits, but the essential components are `clone` (one-time operation), `pull`, `commit` and `push`.

Note: When you're deleting or moving files that are part of a git repository, you can use the regular rm or mv utilities. Git tracks files and directories for you. However, as with every other type of change you make to a git repository, you'll need to do a `commit` and `push` before these changes are reflected in the master copy.

Finally, one more reason to use a version control system is backups! Since multiple copies of your files exist on different machines when you use a VCS, it is much more unlikely to lose data due to hardware failure, accidental deletion, etc. I keep all of my important files in a git repository, even those on which I am the only user.
